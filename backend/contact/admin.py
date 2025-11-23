from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
	list_display = ('name', 'email', 'created_at', 'message_preview')
	list_filter = ('created_at',)
	search_fields = ('name', 'email', 'message')
	readonly_fields = ('created_at',)
	ordering = ('-created_at',)
	
	def message_preview(self, obj):
		return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
	message_preview.short_description = 'Message Preview'
