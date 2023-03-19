from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.dashboard.views import AccountModelViewSet, ReminderModelViewSet, user_saving_amount_in_specific_month

router = DefaultRouter()
router.register('reminder', ReminderModelViewSet, basename='reminder')
router.register('', AccountModelViewSet, basename='account')

urlpatterns = [
    path(r'account/', include(router.urls)),
    path(r'account/saving_amount/<int:year>/<int:month>/', user_saving_amount_in_specific_month),
]
