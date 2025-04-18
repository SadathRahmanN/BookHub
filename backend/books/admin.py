from django.contrib import admin
from django import forms
from .models import User, Book
from django.utils.html import format_html

# Custom User Admin
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username', 'name', 'email', 'role', 'date_of_birth', 'phone_number', 'address',
        'profile_thumbnail', 'is_staff', 'is_superuser'
    )
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'name', 'email', 'phone_number', 'address')
    readonly_fields = ('last_login', 'date_joined', 'profile_thumbnail')

    fieldsets = (
        (None, {
            'fields': ('username', 'email', 'password')
        }),
        ('Personal Info', {
            'fields': ('name', 'role', 'date_of_birth', 'profile_photo', 'phone_number', 'address', 'profile_thumbnail')
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
    list_display = ('title', 'author', 'publication_date', 'is_borrowed', 'borrowed_by')
    list_filter = ('is_borrowed', 'publication_date')
    search_fields = ('title', 'author', 'publication_date')

    def borrowed_by(self, obj):
        if obj.is_borrowed and obj.borrowed_by:
            return obj.borrowed_by.username
        return "Not Borrowed"
    borrowed_by.short_description = "Borrowed By"
