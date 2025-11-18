# newsletter/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber

class SubscribeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email required"}, status=400)
        
        subscriber, created = Subscriber.objects.get_or_create(email=email)
        if created:
            return Response({"message": "Subscribed successfully!"}, status=201)
        else:
            return Response({"message": "Already subscribed!"}, status=200)