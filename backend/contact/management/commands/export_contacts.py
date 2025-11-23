from django.core.management.base import BaseCommand
from django.core import serializers
from contact.models import Contact
from newsletter.models import Subscriber
import json


class Command(BaseCommand):
    help = 'Export contacts and newsletter subscribers to JSON'

    def add_arguments(self, parser):
        parser.add_argument(
            '--format',
            type=str,
            default='json',
            help='Export format (json or csv)',
        )

    def handle(self, *args, **options):
        contacts = Contact.objects.all().order_by('-created_at')
        subscribers = Subscriber.objects.all().order_by('-subscribed_at')

        if options['format'] == 'json':
            data = {
                'contacts': [
                    {
                        'name': contact.name,
                        'email': contact.email,
                        'message': contact.message,
                        'created_at': contact.created_at.isoformat()
                    }
                    for contact in contacts
                ],
                'subscribers': [
                    {
                        'email': subscriber.email,
                        'subscribed_at': subscriber.subscribed_at.isoformat()
                    }
                    for subscriber in subscribers
                ]
            }
            
            self.stdout.write(json.dumps(data, indent=2))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Exported {contacts.count()} contacts and {subscribers.count()} subscribers'
            )
        )