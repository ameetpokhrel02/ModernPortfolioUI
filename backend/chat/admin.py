from django.contrib import admin
from .models import ChatMessage, ChatSession


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'message_preview', 'is_bot', 'timestamp')
    list_filter = ('is_bot', 'timestamp')
    search_fields = ('session_id', 'message')
    readonly_fields = ('timestamp',)
    ordering = ('-timestamp',)
    
    def message_preview(self, obj):
        return obj.message[:100] + '...' if len(obj.message) > 100 else obj.message
    message_preview.short_description = 'Message Preview'


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'created_at', 'last_activity', 'message_count')
    list_filter = ('created_at', 'last_activity')
    search_fields = ('session_id',)
    readonly_fields = ('created_at', 'last_activity')
    ordering = ('-last_activity',)
    
    def message_count(self, obj):
        return ChatMessage.objects.filter(session_id=obj.session_id).count()
    message_count.short_description = 'Messages'