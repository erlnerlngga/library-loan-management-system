"""
Views for the borrow APIs
"""
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework import viewsets
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated

from core.models import Borrower, BookBorrowed
from borrow import serializers


class BorrowerViewSet(viewsets.ModelViewSet):
    """View for manage borrow APIs."""
    serializer_class = serializers.BorrowerSerializers
    queryset = Borrower.objects.all()
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

@extend_schema(
        parameters=[
            OpenApiParameter(
                'active_loan',
                OpenApiTypes.BOOL,
                description='Active Loan to filter',
            ),
        ]
)
class BookBorrowedViewSet(viewsets.ModelViewSet):
    """View for manage book borrowed APIs."""
    serializer_class = serializers.BookBorrowedSerializers
    queryset = BookBorrowed.objects.all()
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieve data base on active loan if available

        Args:
            self: instance

        Returns:
            List of book_borrowed base on active_loan
        """
        active_loan = self.request.query_params.get('active_loan')

        if active_loan is not None:
            active_loan = True if active_loan == "true" else False
            return BookBorrowed.objects.filter(active_loan=active_loan)

        return BookBorrowed.objects.all()