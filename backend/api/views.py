from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import *
from .serializer import *

class UserView(APIView):

    serializer_class = UserSerializer

    def get(self, request):
        user = [{"username": user.username} for user in User.objects.all()]

        return Response(user)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    permission_classes = [AllowAny]