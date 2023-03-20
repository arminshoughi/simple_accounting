from django.contrib.auth import get_user_model
from utils.service import BaseService

UserModel = get_user_model()


class UserService(BaseService):
    model = UserModel

    @classmethod
    def create_user(cls, username, password, **kwargs):
        user = cls.model(username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user
