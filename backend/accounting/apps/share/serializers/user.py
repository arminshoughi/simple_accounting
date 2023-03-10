from django.contrib.auth import get_user_model

from utils.serializers import DynamicFieldsModelSerializer
from .. import services

User = get_user_model()


class UserRegisterSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        service = services.UserService
        exclude = [
            'updated_at', 'created_at', 'last_login', 'is_active', 'is_superuser', 'is_deleted',
            'deleted_at'
        ]
