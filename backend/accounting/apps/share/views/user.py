from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .. import serializers

User = get_user_model()


class UserRegisterViewSet(CreateAPIView):
    serializer_class = serializers.UserRegisterSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.pop('username')
        password = serializer.validated_data.pop('password')
        user = User.objects.create_user(username=username, password=password)
        for item in serializer.validated_data:
            setattr(user, item, serializer.validated_data[item])
        user.save()
        refresh_token = RefreshToken.for_user(user)
        context = {
            'refresh': str(refresh_token),
            'access': str(refresh_token.access_token)
        }
        return Response(data=context, status=status.HTTP_200_OK)
