from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ContentBlock

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class ContentBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentBlock
        fields = '__all__'
        extra_kwargs = {'author': {'read_only': True}}