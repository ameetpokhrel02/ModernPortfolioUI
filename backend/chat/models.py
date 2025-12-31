from django.db import models
from django.utils import timezone


class ChatMessage(models.Model):
    session_id = models.CharField(max_length=100)
    message = models.TextField()
    is_bot = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        sender = "Bot" if self.is_bot else "User"
        return f"{sender}: {self.message[:50]}..."


class ChatSession(models.Model):
    session_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_activity = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Session {self.session_id}"