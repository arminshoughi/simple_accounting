from apps.dashboard.models import AccountModel, ReminderModel
from utils.service import BaseService


class AccountService(BaseService):
    model = AccountModel


class ReminderService(BaseService):
    model = ReminderModel
