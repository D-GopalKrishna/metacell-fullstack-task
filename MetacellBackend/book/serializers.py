
from rest_framework import serializers
from .models import Book, Note, Rating


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['uuid', 'title', 'author', 'description', 'price']


class AddBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'price']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['note', 'book_ref', 'user_ref', 'created_at']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['rating', 'comment', 'book_ref', 'user_ref', 'created_at']