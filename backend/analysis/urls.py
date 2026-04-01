from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_analysis, name='upload_analysis'),
    path('recent/', views.recent_analyses, name='recent_analyses'),
    path('report/<int:pk>/', views.view_report, name='view_report'),
    path('summary/<int:pk>/', views.generate_summary, name='generate_summary'),
    path('pdf/<int:pk>/', views.generate_pdf, name='generate_pdf'),
    path('report/<int:pk>/chat/', views.faculty_chat, name='faculty_chat'),
    path('report/<int:pk>/delete/', views.delete_analysis, name='delete_analysis'),
]
