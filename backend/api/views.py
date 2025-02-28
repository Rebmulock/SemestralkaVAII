from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView

from .serializers import *
from .models import ContentBlock, UserFeedback


class CreateUserView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ListUsersView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUserRoleView(generics.UpdateAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = RoleUpdateSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(request.data)
        if 'is_staff' in request.data:
            instance.is_staff = request.data['is_staff']

        return super().update(request, *args, **kwargs, partial=True)

class UpdatePasswordView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PasswordUpdateSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_password = serializer.validated_data['new_password']
        user.password = make_password(new_password)
        user.save()

        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

class DeleteUserView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"detail": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class CheckAuthenticationView(generics.ListAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        return Response({
            "authenticated": user.is_authenticated,
            "is_staff": user.is_staff}, status=status.HTTP_200_OK)

class CreateContentBlock(generics.ListCreateAPIView):
    serializer_class = ContentBlockSerializer

    def get_queryset(self):
        return ContentBlock.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]

        return [IsAuthenticated()]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class DeleteContentBlock(generics.RetrieveDestroyAPIView):
    serializer_class = ContentBlockSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return ContentBlock.objects.filter(author=user)


class GetUserProfile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user

class UserFeedbackView(generics.ListCreateAPIView):
    queryset = UserFeedback.objects.all()
    serializer_class = UserFeedbackSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAdminUser()]
        return [AllowAny()]

class AnalysisBlockView(generics.ListCreateAPIView):
    serializer_class = AnalysisBlockSerializer
    queryset = AnalysisBlock.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)