from django.http import HttpResponse

def index(request):
    return HttpResponse("<h1>Curriculum.ai Backend is Running 🚀</h1><p>Go to <a href='/api/recent/'>/api/recent/</a> or use the Frontend.</p>")
