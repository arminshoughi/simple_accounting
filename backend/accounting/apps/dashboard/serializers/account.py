from rest_framework import serializers

from utils.serializers import DynamicFieldsModelSerializer

from .. import models
from ..services import AccountService, ReminderService
from ...share.serializers import UserRegisterSerializer


class AccountModelBaseSerializer(DynamicFieldsModelSerializer):
    user_id = serializers.IntegerField(write_only=True)
    user = UserRegisterSerializer(read_only=True)

    class Meta:
        model = models.AccountModel
        service = AccountService
        fields = (
            'id', 'user_id', 'user', 'title', 'description', 'amount', 'typ', 'tag', 'is_checked', 'created_at'
        )


class ReminderModelBaseSerializer(DynamicFieldsModelSerializer):
    user_id = serializers.IntegerField(write_only=True)
    user = UserRegisterSerializer(read_only=True)

    class Meta:
        model = models.ReminderModel
        service = ReminderService
        fields = (
            'id', 'user_id', 'user', 'title', 'description', 'amount', 'account_type', 'reminder_type', 'time_choice',
            'reminding_time', 'is_visible', 'created_at'
        )
