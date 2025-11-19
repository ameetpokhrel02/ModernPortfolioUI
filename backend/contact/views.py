from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Contact


class ContactView(APIView):
	def post(self, request):
		name = request.data.get('name')
		email = request.data.get('email')
		message = request.data.get('message')

		if not name or not email or not message:
			return Response({'error': 'name, email and message are required'}, status=status.HTTP_400_BAD_REQUEST)

		contact = Contact.objects.create(name=name, email=email, message=message)
		return Response({'message': 'Message received', 'id': contact.id}, status=status.HTTP_201_CREATED)
