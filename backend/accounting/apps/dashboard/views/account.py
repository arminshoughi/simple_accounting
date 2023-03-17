from apps.dashboard.serializers import AccountModelBaseSerializer, ReminderModelBaseSerializer
from apps.dashboard.services import AccountService, ReminderService

from utils.viewsets import UserRelatedDataModelViewSet


class AccountModelViewSet(UserRelatedDataModelViewSet):
    queryset = AccountService.all()
    serializer_class = AccountModelBaseSerializer


class ReminderModelViewSet(UserRelatedDataModelViewSet):
    queryset = ReminderService.all()
    serializer_class = ReminderModelBaseSerializer
