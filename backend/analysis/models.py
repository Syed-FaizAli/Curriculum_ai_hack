from django.db import models
from django.contrib.auth.models import User

class AnalysisResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    program_name = models.CharField(max_length=255)
    relevance_score = models.FloatField()
    topics_extracted = models.IntegerField()
    critical_gaps = models.JSONField(default=list)  # list of strings
    suggested_changes = models.JSONField(default=list)  # list of dicts: {what, why, resource_texts}
    raw_output = models.JSONField(default=dict)  # full ML + search + Gemini output
    syllabus_file_names = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.program_name} ({self.relevance_score}%)"
