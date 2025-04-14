from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAdminUser
from .models import Book
from .serializers import BookSerializer

User = get_user_model()  # Use the custom User model

# Fetch all books or filter by query
@api_view(['GET'])
def books_api(request):
    """
    Fetch all books or search by title/author using 'q' query param.
    """
    query = request.query_params.get('q', '')
    if query:
        books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query)
    else:
        books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

# Get single book by ID
@api_view(['GET'])
def get_book(request, book_id):
    """
    Fetch a single book by ID.
    """
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

# Login and signup functionality
@api_view(['POST'])
def login_signup_api(request):
    """
    Handle user login and signup.
    """
    action = request.data.get('action')
    username = request.data.get('username')
    password = request.data.get('password')

    if action == "signup":
        role = request.data.get('role', 'client')
        if User.objects.filter(username=username).exists():
            return Response({"message": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password)
        user.role = role
        user.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

    elif action == "login":
        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful!", "role": user.role}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

# Add a new book (Admin only)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Edit an existing book (Admin only)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookSerializer(book, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a book (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response({"message": "Book deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

# List all users (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    users = User.objects.all()
    user_data = [{"id": user.id, "username": user.username, "role": user.role} for user in users]
    return Response(user_data)

# Get single user (Admin only)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        data = {"id": user.id, "username": user.username, "role": user.role}
        return Response(data)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

# Update a user (Admin only)
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    user.username = request.data.get("username", user.username)
    user.role = request.data.get("role", user.role)
    user.save()
    return Response({"message": "User updated successfully."})

# Delete a user (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
