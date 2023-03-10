from apps.share.models import UserModel
from utils.service import BaseService


class UserService(BaseService):
    model = UserModel
