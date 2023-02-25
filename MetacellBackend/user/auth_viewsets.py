# core/auth/viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .auth_serializers import LoginSerializer, RegistrationSerializer
from .models import User


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        user_data_to_show = serializer.validated_data['user']
        return Response({
            'user': {
                "uuid": user_data_to_show['uuid'],
                "userName": user_data_to_show['userName'],
                "userEmail": user_data_to_show['userEmail'],
            },
            'refresh': str(serializer.validated_data['refresh']),
            'access': str(serializer.validated_data['access']), 
        }, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        ## only take username and password, and useremail from the request
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            userName = request.data['userName']
            userEmail = request.data['userEmail']
            if User.objects.filter(userName=userName).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(userEmail=userEmail).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        user_data_to_show = serializer.data
        print(user_data_to_show)
        return Response({
            "user": {
                "uuid": user_data_to_show
            },
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(ModelViewSet, TokenObtainPairView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)