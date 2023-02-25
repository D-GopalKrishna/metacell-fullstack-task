from django.urls import path
from .views import *

app_name = 'book'

# BOOK URLs
urlpatterns = [
    path('get_book_catalogue', GetBooksCatalogue, name='get_book_catalogue'),
    path('book_details/<uuid:book_id>', GetBookDetails, name='book_details'),
    path('add_book', AddBook, name='add_book'),
    path('add_note', AddNoteOnBook, name='add_note'),
    path('view_notes/<uuid:book_id>', GetNotesOnBook, name='view_notes'),
    # path('add_comment', AddCommentOnBook, name='add_comment'),
    path('add_rating', AddRatingOnBook, name='add_rating'),     ## ratings and comments are embedded in one now.
]

