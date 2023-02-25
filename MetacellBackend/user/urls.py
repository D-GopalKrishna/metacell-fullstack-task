from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import SimpleRouter
from .viewsets import UserViewSet
from .auth_viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from .views import GetAllUserInfo

app_name = 'user'

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')

# USER
urlpatterns = [
    *routes.urls,
    path('userinformation', GetAllUserInfo, name='userinformation'),
]