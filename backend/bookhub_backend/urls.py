"""
URL configuration for bookhub_backend project.

The urlpatterns list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

# View to serve the React app's index.html file
def serve_react(request, path=''):
    """
    Serve the React app's index.html file for the root or any other route.
    The path argument allows handling React's routing in Django.
    """
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),  # Django Admin Panel
    path('api/', include('books.urls')),  # API routes for books and user management
    path('', serve_react, name='react-home'),  # Serve React app at the root URL
    path('<path:path>/', serve_react),  # Catch all other paths for React routes
]
