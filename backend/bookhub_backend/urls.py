"""
URL configuration for bookhub_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/bookhub_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

# View to serve the React app
def serve_react(request):
    """
    Serve the React app's index.html file.
    This assumes that the React build files are in the templates directory.
    """
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),  # Django Admin Panel
    path('api/', include('books.urls')),  # API routes for books and user management
    path('', serve_react, name='home'),  # Serve React app at the root URL
]

