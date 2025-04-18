from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User Model with roles, phone number, and address
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
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


# Book model with borrow status and user relation
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    book_image = models.ImageField(upload_to='book_images/', null=True, blank=True)  # Changed from image_url
    is_borrowed = models.BooleanField(default=False)
    borrowed_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
