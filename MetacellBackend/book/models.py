from django.db import models
import uuid


class Author(models.Model):
    user_ref = models.OneToOneField('user.User', primary_key=True, on_delete=models.CASCADE, blank=True)
    about_author = models.TextField()

    def __str__(self):
        return self.user_ref.userName +  self.about_author



class Book(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False, default = uuid.uuid4, unique=True)
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)   ## A single author can have multiple books
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    published = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.uuid) + ' ' + self.title + "  by the author =>  " + self.author.user_ref.userName 
    
    
class Rating(models.Model):
    user_ref = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
    book_ref = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_ref.userName + " " + self.book_ref.title + " " + str(self.rating) + " " + self.comment
    

class Note(models.Model):
    user_ref = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
    book_ref = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, blank=True)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_ref.userName + " " + self.book_ref.title + " " + self.note