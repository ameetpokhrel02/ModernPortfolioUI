from django.contrib import admin
from .models import Subscriber


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
	list_display = ('email', 'subscribed_at')
	list_filter = ('subscribed_at',)
	search_fields = ('email',)
	readonly_fields = ('subscribed_at',)
	ordering = ('-subscribed_at',)
	
	def get_queryset(self, request):
		qs = super().get_queryset(request)
		return qs.select_related()
