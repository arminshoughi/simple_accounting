from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.dashboard.views import AccountModelViewSet, ReminderModelViewSet

router = DefaultRouter()
router.register('reminder', ReminderModelViewSet, basename='reminder')
router.register('', AccountModelViewSet, basename='account')

urlpatterns = [
    path(r'account/', include(router.urls)),
]
