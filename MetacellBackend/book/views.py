from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import json
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import AccessToken
from .models import *
from .serializers import *
from user.models import *
from drf_yasg import openapi
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import serializers

# Create your views here.
@api_view(['GET'])
def GetBooksCatalogue(request):
    try:
        books = Book.objects.all()
        books = BookSerializer(books, many=True)
        return Response(
            {"books": books.data},
            status=status.HTTP_200_OK
        )
    except:
        return Response(
            {"message": "Could not get books"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def GetBookDetails(request, book_id):
    try:
        book = Book.objects.get(uuid=book_id)
        token = request.META.get('HTTP_AUTHORIZATION', " ")
        if token == " " or token == "" or token == None: 
            return Response(
                {"message": "Token not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        access_token = AccessToken(token)

        try:
            my_book_notes = Note.objects.filter(book_ref=book_id).filter(user_ref=access_token['user_id'])
            temp = []
            for note in my_book_notes:
                temp.append(NoteSerializer(note).data)
            my_book_notes = temp
        except:
            my_book_notes = ''
            
        try:
            rating_obj = Rating.objects.filter(book_ref=book_id).filter(user_ref=access_token['user_id'])
            temp = []
            for note in rating_obj:
                temp.append(RatingSerializer(note).data)
            rating_obj = temp
        except:
            rating_obj = ''

        if book:
            book = BookSerializer(book)
            return Response(
                {"book": book.data, "my_book_notes": my_book_notes, "rating_obj": rating_obj},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "Could not get book details"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except:
        return Response(
            {"message": "Could not get book details"},
            status=status.HTTP_400_BAD_REQUEST
        )
    


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['title', 'author', 'description', 'price'],
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'author': openapi.Schema(type=openapi.TYPE_STRING),
            'description': openapi.Schema(type=openapi.TYPE_STRING),
            'price': openapi.Schema(type=openapi.TYPE_INTEGER, format=openapi.FORMAT_INT32),
        },
    ),
    responses={
        201: 'Created',
        400: 'Bad Request',
    },
    operation_summary='',
    operation_description='Add to the catalogue a new book',
)
@api_view(['POST'])
def AddBook(request):
    try: 
        user_obj = User.objects.get(userName=request.data['author'])
        print(user_obj)
        try:
            author_obj = Author.objects.get(user_ref=user_obj.uuid)
            print(author_obj)
            if author_obj:
                book = Book.objects.create(
                    title=request.data['title'],
                    author= author_obj,
                    description=request.data['description'],
                    price=request.data['price'],
                )
                book.save()
                return Response(
                    {"message": "Book added successfully"},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "Book could not be added"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(
                {"message": "Author does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
    except:
        return Response(
            {"message": "Book could not be added"},
            status=status.HTTP_400_BAD_REQUEST
        )



@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['note', 'book_id', 'user_id'],
        properties={
            'note': openapi.Schema(type=openapi.TYPE_STRING),
            'book_id': openapi.Schema(type=openapi.TYPE_STRING),
            'user_id': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={
        201: 'Created',
        400: 'Bad Request',
    },
    operation_summary='',
    operation_description='Add note to a book',
)
@api_view(['POST'])
def AddNoteOnBook(request):
    try:
        book_obj = Book.objects.get(uuid=request.data['book_id'])
        user_obj = User.objects.get(uuid=request.data['user_id'])
        if book_obj and user_obj:
            note = Note.objects.create(
                note=request.data['note'],
                book_ref=book_obj,
                user_ref=user_obj,
            )
            note.save()
            return Response(
                {"message": "Note added successfully"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "Note could not be added"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except:
        return Response(
            {"message": "Note could not be added"},
            status=status.HTTP_400_BAD_REQUEST
        )



@api_view(['GET'])
def GetNotesOnBook(request, book_id):
    try:
        token = request.META.get('HTTP_AUTHORIZATION', " ")
        if token == " " or token == "" or token == None: 
            return Response(
                {"message": "Token not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        access_token = AccessToken(token)
        my_book_notes = Note.objects.filter(book_ref=book_id).filter(user_ref=access_token['user_id'])
        temp = []
        for note in my_book_notes:
            temp.append(NoteSerializer(note).data)
        my_book_notes = temp
            
        return Response(
            {"notes": my_book_notes},
            status=status.HTTP_200_OK
        )
    except:
        return Response(
            {"message": "Could not get book details"},
            status=status.HTTP_400_BAD_REQUEST
        )


@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['rating', 'commment', 'book_id', 'user_id'],
        properties={
            'rating': openapi.Schema(type=openapi.TYPE_INTEGER, format=openapi.FORMAT_INT32),
            'comment': openapi.Schema(type=openapi.TYPE_STRING),
            'book_id': openapi.Schema(type=openapi.TYPE_STRING),
            'user_id': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={
        201: 'Created',
        400: 'Bad Request',
    },
    operation_summary='',
    operation_description='Add rating and comment to a book',
)
@api_view(['POST'])
def AddRatingOnBook(request):
    try:
        book_obj = Book.objects.get(uuid=request.data['book_id'])
        user_obj = User.objects.get(uuid=request.data['user_id'])
        if book_obj and user_obj:
            rating = Rating.objects.create(
                rating=request.data['rating'],
                comment=request.data['comment'],
                book_ref=book_obj,
                user_ref=user_obj,
            )
            rating.save()
            return Response(
                {"message": "Rating and Comment added successfully"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "Rating and Comment could not be added"},
                status=status.HTTP_400_BAD_REQUEST
            )
    except:
        return Response(
            {"message": "Rating and Comment could not be added"},
            status=status.HTTP_400_BAD_REQUEST
        )


