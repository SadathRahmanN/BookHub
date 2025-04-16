from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User Model with roles
class User(AbstractUser):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('librarian', 'Librarian'),
        ('patron', 'Patron'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    date_of_birth = models.DateField(null=True, blank=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

# Book model
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    image_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title
