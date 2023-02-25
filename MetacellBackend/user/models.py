import re
from django.db import models
from django.db.models import JSONField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class UserManager(BaseUserManager):
    def create_user(self, userName, userEmail, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, userName and password."""
        if userName is None:
            raise TypeError('Users must have a userName.')
        if userEmail is None:
            raise TypeError('Users must have an email.')

        user = self.model(userName=userName, userEmail=self.normalize_email(userEmail))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, userName, userEmail, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if userEmail is None:
            raise TypeError('Superusers must have an email.')
        if userName is None:
            raise TypeError('Superusers must have an userName.')

        user = self.create_user(userName, userEmail=userEmail, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, unique=True)
    userName = models.CharField(db_index=True, max_length=255, unique=True)
    userEmail = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    createdOn = models.DateTimeField(auto_now_add=True)
    lastLogin = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=False)   
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'userEmail'
    REQUIRED_FIELDS = ['userName']

    objects = UserManager()

    def __str__(self):
        return f"{self.uuid}" + " " + f"{self.userEmail}"
