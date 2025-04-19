from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import Book, BorrowedBook
from .serializers import BookSerializer, UserSerializer, BorrowedBookSerializer

User = get_user_model()

# ========================= BOOK VIEWS =========================

@api_view(['GET'])
def books_api(request):
    query = request.query_params.get('q', '')
    if query:
        books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query)
    else:
        books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_book(request, book_id):
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
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response({"message": "Book deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

# ========================= AUTH & JWT =========================

@api_view(['POST'])
def login_signup_api(request):
    action = request.data.get('action')
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"message": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if action == "signup":
        role = request.data.get('role', 'client')
        if User.objects.filter(username=username).exists():
            return Response({"message": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, role=role)
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

    elif action == "login":
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful!",
                "role": user.role,
                "username": user.username,
                "user_id": user.id,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        return Response({"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

# ========================= ROLE-BASED LOGIN =========================

@api_view(['POST'])
def login_with_role_redirect(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"message": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user:
        redirect_url = f"/{user.role}/dashboard" if user.role else "/client/dashboard"
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful!",
            "role": user.role,
            "username": user.username,
            "user_id": user.id,
            "redirect_url": redirect_url,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
    return Response({"message": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

# ========================= USER MANAGEMENT =========================

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, user_id):
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
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

# ========================= BORROWED BOOKS =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def borrow_book(request):
    user = request.user
    book_id = request.data.get('book_id')
    try:
        book = Book.objects.get(id=book_id)
        if BorrowedBook.objects.filter(user=user, book=book).exists():
            return Response({"message": "You already borrowed this book."}, status=status.HTTP_400_BAD_REQUEST)
        BorrowedBook.objects.create(user=user, book=book)
        return Response({"message": "Book borrowed successfully."}, status=status.HTTP_201_CREATED)
    except Book.DoesNotExist:
        return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_borrowed_books(request):
    user = request.user
    borrowed_books = BorrowedBook.objects.filter(user=user)
    serializer = BorrowedBookSerializer(borrowed_books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_borrowed_books(request):
    if request.user.role not in ['admin', 'librarian']:
        return Response({"message": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
    borrowed_books = BorrowedBook.objects.all()
    serializer = BorrowedBookSerializer(borrowed_books, many=True)
    return Response(serializer.data)

# ========================= PENDING LIBRARIANS =========================

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_pending_librarians(request):
    pending_librarians = User.objects.filter(role='librarian', is_active=False)
    serializer = UserSerializer(pending_librarians, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_librarian(request, user_id):
    try:
        user = User.objects.get(id=user_id, role='librarian')
        user.is_active = True
        user.save()
        return Response({"message": "Librarian approved successfully."})
    except User.DoesNotExist:
        return Response({"message": "Librarian not found."}, status=status.HTTP_404_NOT_FOUND)
