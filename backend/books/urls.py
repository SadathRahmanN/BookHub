# backend/books/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.books_api, name='books_api'),
    path('auth/', views.login_signup_api, name='login_signup_api'),
    path('books/add/', views.add_book, name='add_book'),
    path('books/edit/<int:book_id>/', views.edit_book, name='edit_book'),
    path('books/delete/<int:book_id>/', views.delete_book, name='delete_book'),
    path('users/', views.list_users, name='list_users'),
    path('users/update/<int:user_id>/', views.update_user, name='update_user'),
    path('users/delete/<int:user_id>/', views.delete_user, name='delete_user'),
]
