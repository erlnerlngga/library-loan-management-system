"""
Django command for populate book data.
"""
from django.core.management.base import BaseCommand
from core.models import Book
import json
import os

class Command(BaseCommand):
    """Django command for insert book data to database."""

    def handle(self, *args, **options):
        """Entrypoint for command."""
        json_file_path = os.path.join(os.path.dirname(__file__), '../../../../dummy_books.json')

        if not os.path.exists(json_file_path):
            self.stdout.write(self.style.ERROR(f"Error: JSON file not found at {json_file_path}"))
            return

        with open(json_file_path, 'r') as f:
            dummy_book_data = json.load(f)

        books_to_create = []
        for data in dummy_book_data:
            # Check if a book with this ISBN already exists to avoid duplicates
            if not Book.objects.filter(isbn=data['isbn']).exists():
                book = Book(
                    title=data['title'],
                    isbn=data['isbn'],
                    stock=data['stock']
                )
                books_to_create.append(book)
            else:
                self.stdout.write(self.style.WARNING(f"Skipping existing book: {data['title']} (ISBN: {data['isbn']})"))

        if books_to_create:
            # delete all data first if needed
            # self.stdout.write(self.style.WARNING("Deleting all existing Book data..."))
            # Book.objects.all().delete()
            # self.stdout.write(self.style.SUCCESS("All existing Book data deleted."))

            # insert the data
            created_books = Book.objects.bulk_create(books_to_create)
            self.stdout.write(self.style.SUCCESS(f"Successfully inserted {len(created_books)} new books."))
        else:
            self.stdout.write(self.style.MIGRATE_HEADING("No new books to insert or all books already exist."))