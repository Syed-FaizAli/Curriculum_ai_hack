import os
import json
import requests
import pdfplumber
import google.generativeai as genai
from sentence_transformers import SentenceTransformer, util
from dotenv import load_dotenv

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / '.env'
load_dotenv(dotenv_path=env_path)

print(f"DEBUG: Current CWD: {os.getcwd()}")
print(f"DEBUG: Loading .env from: {env_path}")
print(f"DEBUG: GEMINI_API_KEY loaded? {'Yes' if os.getenv('GEMINI_API_KEY') else 'No'}")

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Configure Search (Serper or Google Custom Search)
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

# Load embedding model once at module level (avoids reloading per request)
print("Loading Sentence Transformer model...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Sentence Transformer model loaded.")

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
    return text

def search_industry_trends(query):
    """Searches for current industry trends using Serper.dev or similar."""
    if not SERPER_API_KEY:
        print("SERPER_API_KEY not found, skipping live search.")
        return []
    
    url = "https://google.serper.dev/search"
    payload = json.dumps({"q": query})
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.request("POST", url, headers=headers, data=payload)
        results = response.json()
        snippets = []
        if 'organic' in results:
            for item in results['organic'][:5]: # Top 5 results
                snippets.append(f"Source: {item.get('title')}\nSnippet: {item.get('snippet')}\nLink: {item.get('link')}")
        return snippets
    except Exception as e:
        print(f"Search error: {e}")
        return []


def compute_embedding_score(curriculum_text, search_results):
    """
    Computes a deterministic relevance score using cosine similarity
    between curriculum content and industry trend keywords.
    
    This provides a stable, reproducible score component that anchors
    the overall relevance scoring regardless of LLM variability.
    """
    if not search_results:
        print("No search results for embedding scoring, skipping.")
        return None
    
    # Combine search snippets into a single industry context string
    industry_text = " ".join(search_results)
    
    # Split curriculum into chunks for better embedding coverage
    # Use paragraphs or fixed-size chunks (max ~500 chars each)
    curriculum_chunks = [
        curriculum_text[i:i+500]
        for i in range(0, min(len(curriculum_text), 15000), 500)
    ]
    
    if not curriculum_chunks:
        return None
    
    # Encode industry context and curriculum chunks
    industry_embedding = embedding_model.encode(industry_text, convert_to_tensor=True)
    curriculum_embeddings = embedding_model.encode(curriculum_chunks, convert_to_tensor=True)
    
    # Compute cosine similarities between each chunk and industry context
    similarities = util.cos_sim(curriculum_embeddings, industry_embedding.unsqueeze(0))
    
    # Use the mean of all chunk similarities as the base score
    mean_similarity = similarities.mean().item()
    
    # Scale from cosine similarity range [0, 1] to score range [0, 100]
    # Cosine similarity for related text typically falls in [0.2, 0.7]
    # Map this range to [30, 95] for a more meaningful score distribution
    scaled_score = max(0, min(100, ((mean_similarity - 0.15) / 0.55) * 100))
    
    print(f"Embedding Score: {scaled_score:.1f} (raw cosine similarity: {mean_similarity:.4f})")
    return round(scaled_score, 1)


def analyze_curriculum(syllabus_paths, program_name, feedback_path=None):
    print(f"--- Starting Analysis for {program_name} ---")
    
    # Check API Key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("CRITICAL ERROR: GEMINI_API_KEY not found in environment variables.")
        return {
            "relevance_score": 0,
            "topics_extracted": 0,
            "critical_gaps": ["Missing API Key"],
            "suggested_changes": [],
            "summary": "Backend Error: Gemini API Key is missing. Please check .env file.",
            "search_context": []
        }

    # 1. Extract Text
    full_text = ""
    for path in syllabus_paths:
        print(f"Extracting text from: {path}")
        text = extract_text_from_pdf(path)
        full_text += text
        print(f"Extracted {len(text)} chars from {path}")
    
    if not full_text.strip():
        print("ERROR: No text extracted from PDFs.")
        return {
            "relevance_score": 0,
            "topics_extracted": 0,
            "critical_gaps": ["Unreadable PDF"],
            "suggested_changes": [],
            "summary": "Error: Could not read text from the uploaded PDF. It might be an image-only PDF.",
            "search_context": []
        }

    # 2. Get Current Trends (Live Search)
    print("Performing Live Search...")
    search_query = f"2026 {program_name} job market skills trends India global"
    search_results = search_industry_trends(search_query)
    search_context = "\n\n".join(search_results)
    print(f"Search found {len(search_results)} results.")

    # 3. Compute Deterministic Embedding Score
    print("Computing Embedding Score...")
    embedding_score = compute_embedding_score(full_text, search_results)

    # 4. Analyze with Gemini (temperature=0 for deterministic output)
    print("Sending request to Gemini (temperature=0)...")
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = f"""
    You are an expert curriculum consultant. 
    Analyze the following curriculum text for a "{program_name}" program against current industry trends.
    
    Industry Trends Context (Real-time Search):
    {search_context}
    
    Curriculum Content:
    {full_text[:30000]}
    
    Perform the following analysis:
    1. Determine a relevance score (0-100) based on alignment with 2026 industry needs.
    2. Identify specific critical gaps (missing skills/topics).
    3. Suggest specific updates (what to change, why, and a recommended resource/topic to add).
    4. Count topics extracted.
    
    **SCORING RUBRIC (follow strictly):**
    - 90-100: Curriculum covers >90% of current industry skills. Cutting-edge topics present.
    - 75-89: Covers most key skills (>75%). Minor gaps in emerging tech.
    - 60-74: Covers foundational skills but missing several modern/trending topics.
    - 40-59: Significant gaps. Many critical industry skills absent.
    - 0-39: Severely outdated or misaligned with industry needs.
    
    Base your score on concrete evidence: count how many of the industry-demanded skills 
    from the search results appear (or have equivalents) in the curriculum, then map that 
    coverage percentage to the rubric above.
    
    Output strictly valid JSON with this structure:
    {{
        "relevance_score": 85.5,
        "topics_extracted": 42,
        "critical_gaps": ["topic 1", "topic 2"],
        "suggested_changes": [
            {{ "what_to_update": "Add React Hooks", "why_to_update": "Standard in 2026 dev", "resource_texts": "Official React Docs, Udemy Course" }}
        ],
        "summary": "Executive summary of the analysis..."
    }}
    """
    
    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(temperature=0)
        )
        print("Gemini Response Received.")

        # Clean response text to ensure it's just JSON
        text = response.text.replace('```json', '').replace('```', '')
        data = json.loads(text)
        
        # 5. Compute Hybrid Score (embedding anchors, LLM provides nuance)
        llm_score = data.get('relevance_score', 0)
        
        if embedding_score is not None:
            # Weighted average: 40% embedding (stable) + 60% LLM (nuanced)
            hybrid_score = round(0.4 * embedding_score + 0.6 * llm_score, 1)
            print(f"Hybrid Score: {hybrid_score} (LLM: {llm_score}, Embedding: {embedding_score})")
            data['relevance_score'] = hybrid_score
            data['score_breakdown'] = {
                'llm_score': llm_score,
                'embedding_score': embedding_score,
                'weights': {'llm': 0.6, 'embedding': 0.4}
            }
        else:
            print(f"Using LLM-only score: {llm_score} (no embedding data)")
        
        # Add raw search context to the output for reference
        data['search_context'] = search_results
        
        print("Analysis Successfully Parsed.")
        return data
    except Exception as e:
        print(f"LLM Analysis Error: {e}")
        import traceback
        traceback.print_exc()
        
        # Fallback: use embedding score if available
        fallback_score = embedding_score if embedding_score is not None else 0
        return {
            "relevance_score": fallback_score,
            "topics_extracted": 0,
            "critical_gaps": [f"Error: {str(e)[:100]}"],
            "suggested_changes": [],
            "summary": "Analysis failed due to an internal error. Check server logs.",
            "search_context": search_results
        }

if __name__ == "__main__":
    # Test run
    pass
