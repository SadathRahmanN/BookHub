from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAdminUser
from .models import Book
from .serializers import BookSerializer, UserSerializer

User = get_user_model()

# ========================= BOOK VIEWS =========================

@api_view(['GET'])
def books_api(request):
    """
    Fetch all books or search by title/author using 'q' query param.
    """
    query = request.query_params.get('q', '')
    if query:
        # Search by title or author
        books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query)
    else:
        # Fetch all books
        books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_book(request):
    """
    Add a new book.
    """
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_book(request, book_id):
    """
    Edit a book by its ID.
    """
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookSerializer(book, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_book(request, book_id):
    """
    Delete a book by its ID.
    """
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response({"message": "Book deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

# ========================= AUTH VIEWS =========================

@api_view(['POST'])
def login_signup_api(request):
    """
    Handle user login and signup.
    """
    action = request.data.get('action')
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"message": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

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
        
        if user is not None:
            return Response({
                "message": "Login successful!",
                "role": user.role,
                "username": user.username,
                "user_id": user.id
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

# ========================= USER MANAGEMENT =========================

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    """
    List all users.
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user(request, user_id):
    """
    Fetch a single user by ID.
    """
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, user_id):
    """
    Update user information.
    """
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully."})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, user_id):
    """
    Delete a user by ID.
    """
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

# ========================= ADDITIONAL AUTH VIEWS =========================

@api_view(['POST'])
def login_with_role_redirect(request):
    """
    Login with role-based redirection (admin, librarian, client).
    """
    action = request.data.get('action')
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"message": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if action == "login":
        user = authenticate(username=username, password=password)
        
        if user is not None:
            redirect_url = ''
            if user.role == 'admin':
                redirect_url = '/admin/dashboard'
            elif user.role == 'librarian':
                redirect_url = '/librarian/dashboard'
            elif user.role == 'patron':
                redirect_url = '/patron/dashboard'
            else:  # Default to client
                redirect_url = '/client/dashboard'

            return Response({
                "message": "Login successful!",
                "role": user.role,
                "username": user.username,
                "user_id": user.id,
                "redirect_url": redirect_url
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
