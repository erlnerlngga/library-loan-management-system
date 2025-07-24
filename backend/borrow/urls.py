"""
URL mapping for the borrow API.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('borrower', views.BorrowerViewSet)
router.register('book', views.BookBorrowedViewSet)

app_name = 'borrow'

urlpatterns = [
    path('', include(router.urls)),
]