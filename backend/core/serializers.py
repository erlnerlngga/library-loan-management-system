# core/serializers.py
from rest_framework import serializers

class HealthCheckSerializer(serializers.Serializer):
    healthy = serializers.BooleanField(read_only=True)