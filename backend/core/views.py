# core/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiExample
from .serializers import HealthCheckSerializer # Import your serializer

@extend_schema(
    summary="Check API health",
    description="Returns a simple status to indicate if the API is operational.",
    responses={200: HealthCheckSerializer},
    examples=[
        OpenApiExample(
            'Success example',
            value={'healthy': True},
            response_only=True,
            status_codes=["200"]
        )
    ]
)
@api_view(['GET'])
def health_check(request):
    """Returns successful response."""
    return Response({'healthy': True})