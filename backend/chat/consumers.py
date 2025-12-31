import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from .models import ChatMessage, ChatSession
from .chatbot import get_bot_response


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session_id = str(uuid.uuid4())
        self.room_group_name = f'chat_{self.session_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        
        # Create chat session
        await self.create_chat_session()
        
        # Send welcome message
        await self.send(text_data=json.dumps({
            'type': 'bot_message',
            'message': "Hi! I'm Amit's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?",
            'timestamp': str(timezone.now())
        }))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Save user message
        await self.save_message(message, is_bot=False)

        # Get bot response
        bot_response = await self.get_bot_response(message)
        
        # Save bot response
        await self.save_message(bot_response, is_bot=True)

        # Send bot response
        await self.send(text_data=json.dumps({
            'type': 'bot_message',
            'message': bot_response,
            'timestamp': str(timezone.now())
        }))

    @database_sync_to_async
    def create_chat_session(self):
        from django.utils import timezone
        ChatSession.objects.get_or_create(
            session_id=self.session_id,
            defaults={'last_activity': timezone.now()}
        )

    @database_sync_to_async
    def save_message(self, message, is_bot=False):
        from django.utils import timezone
        ChatMessage.objects.create(
            session_id=self.session_id,
            message=message,
            is_bot=is_bot
        )
        # Update session activity
        ChatSession.objects.filter(session_id=self.session_id).update(
            last_activity=timezone.now()
        )

    @database_sync_to_async
    def get_bot_response(self, user_message):
        return get_bot_response(user_message)