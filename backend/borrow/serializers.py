"""
Serializers for borrow APIs.
"""
from django.utils.translation import gettext as _

from datetime import date, timedelta
from rest_framework import serializers
from django.db import transaction

from core.models import Borrower, BookBorrowed, Book
from book.serializers import BookSerializers

class BorrowerSerializers(serializers.ModelSerializer):
    """Serializer for borrower model."""

    class Meta:
        model = Borrower
        fields = ["id", "card_number", "name", "email", 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate(self, data):
        """
        To validate book stock and active loans.
        """
        card_number = data['card_number']

        borrower = Borrower.objects.filter(card_number=card_number).first()

        if borrower:
            active_loan_exists = BookBorrowed.objects.filter(
                borrower=borrower,
                active_loan=True
            ).exists()

            if active_loan_exists:
                raise serializers.ValidationError(
                    {
                        'book': f"Borrower '{borrower.name}' has active loan"
                    }
                )

        return data

class BorrowerDataInputSerializer(serializers.Serializer):
    """Serializer for validating the borrower data input."""
    card_number = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()

    class Meta:
        # This helps in the browsable API to not show this as a standalone model
        swagger_schema_fields = {
            'title': 'BorrowerData'
        }

class BookBorrowedSerializers(serializers.ModelSerializer):
    """Serializer for book borrowed model."""

    borrower = BorrowerSerializers(read_only=True)
    borrower_data = BorrowerDataInputSerializer(write_only=True)

    class Meta:
        model = BookBorrowed
        fields = ["id", "borrower", "borrower_data", "book", "duration", 'active_loan','created_at']
        read_only_fields = ['id', 'created_at', 'borrower']

    def validate(self, data):
        """
        Validate book stock and check for existing active loans.
        """
        # On PUT/PATCH, self.instance is the object being updated.
        # On POST, self.instance is None.

        if self.instance is None:
            book = data['book']
            borrower_data = data['borrower_data']
            card_number = borrower_data['card_number']
            duration = data['duration']

            #1. check duration cannot more than 30dayss
            if duration:
                if duration <= date.today():
                    raise serializers.ValidationError(
                        {'error': 'The duration must be in the future.'}
                    )

                if duration > (date.today() + timedelta(days=31)):
                    raise serializers.ValidationError(
                        {'error': 'The duration cannot be more than 30 days from now.'}
                    )

            # 2. Check if the book is in stock
            if book.stock <= 0:
                raise serializers.ValidationError(
                    {'error': "This book is out of stock."}
                )

            # 3. Check if the borrower already has an active loan for this specific book
            borrower = Borrower.objects.filter(card_number=card_number).first()
            if borrower:
                active_loan_exists = BookBorrowed.objects.filter(
                    borrower=borrower,
                    active_loan=True
                ).exists()



                if active_loan_exists:
                    raise serializers.ValidationError(
                        {
                            'error': f"Borrower '{borrower.name}' already has an active loan for the book '{book.title}'."
                        }
                    )

        return data


    def create(self, validated_data):
        """Create a new borrower"""
        with transaction.atomic():

            borrower = validated_data.pop('borrower_data', None)
            book_id = validated_data.pop('book').id
            book = Book.objects.get(id=book_id)

            borrower_obj, created = Borrower.objects.get_or_create(**borrower)
            book_borrowed = BookBorrowed.objects.create(**validated_data, book=book, borrower=borrower_obj)

            book.stock -= 1
            book.save()

            return book_borrowed

    def update(self, instance, validated_data):
        """Update data borrower"""
        with transaction.atomic():
            borrower = validated_data.pop('borrower_data', None)

            if borrower is not None:
                borrower_obj, created = Borrower.objects.get_or_create(**borrower)
                instance.borrower = borrower_obj

            for attr, value in validated_data.items():
                setattr(instance, attr, value)

            instance.save()
            return instance


    def to_representation(self, instance):
        """Customize the representation of the project."""
        representation = super().to_representation(instance)
        representation['book'] = BookSerializers(instance.book).data
        return representation

