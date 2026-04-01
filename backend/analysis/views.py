import os
import uuid
import json
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import AnalysisResult
from .serializers import AnalysisResultSerializer
from analyze_curriculum import analyze_curriculum
import google.generativeai as genai
from django.contrib.auth.models import User # For dummy user association if needed
from dotenv import load_dotenv

# Load env variables if not already loaded
load_dotenv(os.path.join(settings.BASE_DIR, '.env'))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Mock login for hackathon simplicity if auth not fully integrated
# ideally use @login_required classes or DRF permissions

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_analysis(request):
    try:
        program_name = request.data.get('program_name')
        files = request.FILES.getlist('syllabus_files')
        
        if not files:
            return Response({'error': 'No files uploaded'}, status=400)

        # Save files temporarily
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp', str(uuid.uuid4()))
        os.makedirs(temp_dir, exist_ok=True)
        
        file_paths = []
        file_names = []
        for f in files:
            path = os.path.join(temp_dir, f.name)
            with open(path, 'wb+') as destination:
                for chunk in f.chunks():
                    destination.write(chunk)
            file_paths.append(path)
            file_names.append(f.name)

        # Run Analysis
        # For simplicity, passing program_name. Real app might check feedback_file too.
        result_data = analyze_curriculum(file_paths, program_name)
        
        # Save to DB
        # Assign to first user if exists, or null
        user = User.objects.first() 
        
        analysis = AnalysisResult.objects.create(
            user=user,
            program_name=program_name,
            relevance_score=result_data.get('relevance_score', 0),
            topics_extracted=result_data.get('topics_extracted', 0),
            critical_gaps=result_data.get('critical_gaps', []),
            suggested_changes=result_data.get('suggested_changes', []),
            raw_output=result_data,
            syllabus_file_names=file_names
        )

        # Cleanup temp files
        # shutil.rmtree(temp_dir) # Uncomment in prod

        return Response({
            'success': True,
            'analysis_id': analysis.id,
            'relevance_score': analysis.relevance_score
        })

    except Exception as e:
        print(f"Error in upload: {e}")
        return Response({'success': False, 'error': str(e)}, status=500)

@api_view(['GET'])
def recent_analyses(request):
    # Return last 10, typically filtered by request.user
    results = AnalysisResult.objects.all().order_by('-created_at')[:10]
    serializer = AnalysisResultSerializer(results, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def view_report(request, pk):
    result = get_object_or_404(AnalysisResult, pk=pk)
    serializer = AnalysisResultSerializer(result)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_analysis(request, pk):
    result = get_object_or_404(AnalysisResult, pk=pk)
    result.delete()
    return Response({'success': True, 'message': 'Analysis deleted successfully'})

# Placeholders for advanced features
@api_view(['POST'])
def generate_summary(request, pk):
    return Response({'summary': "AI-generated executive summary placeholder..."})

@api_view(['GET'])
def generate_pdf(request, pk):
    # Generate PDF logic here using weasyprint or reportlab
    return Response({'status': 'PDF generation not implemented yet'})

@api_view(['POST'])
def faculty_chat(request, pk):
    try:
        analysis = AnalysisResult.objects.get(pk=pk)
    except AnalysisResult.DoesNotExist:
        return Response({'error': 'Analysis not found'}, status=404)

    user_message = request.data.get('message')
    history = request.data.get('history', [])
    
    if not user_message:
        return Response({'error': 'Message is required'}, status=400)

    # Format history for context
    chat_history_text = ""
    if history:
        chat_history_text = "\n--- CONVERSATION HISTORY ---\n"
        # Skip the first greeting message if exists, or just process all
        for msg in history:
            role = "AI" if msg.get('type') == 'bot' else "User"
            chat_history_text += f"{role}: {msg.get('text')}\n"
    
    # Prepare Context
    program_name = analysis.program_name
    score = analysis.relevance_score
    topics = analysis.topics_extracted
    gaps = ", ".join(analysis.critical_gaps) if analysis.critical_gaps else "None identified"
    
    # Format recommendations
    recs = ""
    for idx, r in enumerate(analysis.suggested_changes, 1):
        recs += f"{idx}. {r.get('what_to_update')} (Why: {r.get('why_to_update')})\n"
    
    summary = analysis.raw_output.get('summary', 'N/A')

    # Construct System Prompt / Context
    context = f"""
    You are an expert AI Curriculum Consultant for the program: "{program_name}".
    Your goal is to help the faculty member understand the analysis report and improve their curriculum.

    --- ANALYSIS REPORT SUMMARY ---
    Relevance Score: {score}/100
    Topics Extracted: {topics}
    
    CRITICAL GAPS IDENTIFIED:
    {gaps}

    RECOMMENDED CHANGES:
    {recs}

    EXECUTIVE SUMMARY:
    {summary}
    -------------------------------

    {chat_history_text}

    USER QUERY: "{user_message}"

    INSTRUCTIONS:
    1. Base your answers on the Analysis Report above, **but you may also use your general knowledge** to explain concepts, provide examples, or suggest resources not listed in the report.
    2. Maintain context from the conversation history.
    3. If the user asks for resources, feel free to suggest reputable standard resources (e.g., Coursera, EdX, official documentation) even if they aren't in the report.
    4. If there are critical gaps, explain *why* they matter for current industry trends (2026).
    5. Always keep the program's context in mind (e.g., if it's a Computer Science program, give CS-relevant examples).
    6. Be professional, encouraging, and helpful.

    **FORMATTING GUIDELINES:**
    - Use **Markdown** structure for your responses.
    - Use **Bullet points** or **numbered lists** to break down clear steps or items.
    - Use **Bold text** for key terms or emphasis.
    - Use `Code blocks` if sharing code snippets.
    - Keep paragraphs short and readable.
    """

    try:
        print(f"Chat Query for {program_name}: {user_message}")
        # Re-configure API key at call time to ensure latest key is used
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            load_dotenv(os.path.join(settings.BASE_DIR, '.env'), override=True)
            api_key = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=api_key)
        print(f"Using API key: {api_key[:10]}...")
        
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(context)
        return Response({'response': response.text})
    except Exception as e:
        import traceback
        print(f"Chat Error: {e}")
        traceback.print_exc()
        error_msg = str(e).lower()
        if 'quota' in error_msg or 'rate' in error_msg or '429' in error_msg:
            return Response({'response': "⚠️ API rate limit reached. Please wait a moment and try again, or update your API key in `backend/.env`."}, status=500)
        elif 'invalid' in error_msg or 'api_key' in error_msg or '401' in error_msg or '403' in error_msg:
            return Response({'response': "⚠️ Invalid API key. Please check your `GEMINI_API_KEY` in `backend/.env` and restart the server."}, status=500)
        else:
            return Response({'response': f"I'm having trouble connecting to the AI right now. Error: {str(e)[:150]}"}, status=500)
