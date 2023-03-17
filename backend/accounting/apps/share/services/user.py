from django.contrib.auth import get_user_model
from utils.service import BaseService

UserModel = get_user_model()


class UserService(BaseService):
    model = UserModel
