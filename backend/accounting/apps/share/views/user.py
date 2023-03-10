from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import CreateAPIView

from .. import services, serializers

User = get_user_model()


class UserRegisterViewSet(CreateAPIView):
    serializer_class = serializers.UserRegisterSerializer
    queryset = User.objects.all()
