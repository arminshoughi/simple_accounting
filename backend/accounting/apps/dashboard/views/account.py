from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from apps.dashboard.serializers import AccountModelBaseSerializer, ReminderModelBaseSerializer
from apps.dashboard.services import AccountService, ReminderService


class AccountModelViewSet(ModelViewSet):
    queryset = AccountService.all()
    serializer_class = AccountModelBaseSerializer
    permission_classes = [IsAuthenticated]


class ReminderModelViewSet(ModelViewSet):
    queryset = ReminderService.all()
    serializer_class = ReminderModelBaseSerializer
    permission_classes = [IsAuthenticated]
