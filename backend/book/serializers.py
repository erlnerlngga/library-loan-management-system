"""
Serializers for book APIs.
"""
from django.utils.translation import gettext as _

from rest_framework import serializers
from django.db import transaction

from core.models import Book

class BookSerializers(serializers.ModelSerializer):
    """Serializer for book model."""

    class Meta:
        model = Book
        fields = ["id", "title", "isbn", "stock"]
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        """Update book."""
        with transaction.atomic():

            for attr, value in validated_data.items():
                setattr(instance, attr, value)

            instance.save()
            return instance