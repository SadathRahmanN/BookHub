from django.contrib import admin
from django import forms
from .models import User, Book
from django.utils.html import format_html

# Custom User Admin
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'date_of_birth', 'phone_number', 'address', 'profile_thumbnail', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'phone_number', 'address')  # Added phone and address to search fields
    readonly_fields = ('last_login', 'date_joined', 'profile_thumbnail')

    fieldsets = (
        (None, {
            'fields': ('username', 'email', 'password')
        }),
        ('Personal Info', {
            'fields': ('role', 'date_of_birth', 'profile_photo', 'phone_number', 'address', 'profile_thumbnail')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )

    def profile_thumbnail(self, obj):
        if obj.profile_photo:
            return format_html('<img src="{}" style="height:50px;border-radius:4px;" />', obj.profile_photo.url)
        return "-"
    profile_thumbnail.short_description = "Profile Photo"

# Custom form for Book with calendar widget
class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = '__all__'
        widgets = {
            'publication_date': forms.SelectDateWidget(years=range(1900, 2101)),
        }

# Book Admin
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    form = BookForm
    list_display = ('title', 'author', 'publication_date', 'is_borrowed', 'borrowed_by')  # Added borrowed status
    list_filter = ('is_borrowed', 'publication_date')
    search_fields = ('title', 'author', 'publication_date')

    # Optional: Add a method to show borrowed status in the admin list view
    def borrowed_by(self, obj):
        if obj.is_borrowed and obj.borrowed_by:
            return obj.borrowed_by.username  # Show the username of the person who borrowed the book
        return "Not Borrowed"
    borrowed_by.short_description = "Borrowed By"
