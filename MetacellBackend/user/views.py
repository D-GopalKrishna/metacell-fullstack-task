from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from .serializers import UserSerializer
import json
from rest_framework_simplejwt.tokens import AccessToken

## --------     Create your views here.      --------   ##
@api_view(['GET'])
@permission_classes([AllowAny])
def GetAllUserInfo(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ")
    if token == " " or token == "" or token == None: 
        return Response(
            {"message": "Token not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'GET':
        try:
            data = []
            userObj = User.objects.all()
            if userObj:
                for user in userObj:
                    serializer = UserSerializer(user)
                    data.append(serializer.data)
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "No User found"},
                    status=status.HTTP_204_NO_CONTENT
                )
        except:
            return Response(
                {"message": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

