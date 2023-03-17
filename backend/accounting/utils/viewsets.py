from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class UserRelatedDataModelViewSet(ModelViewSet):
    queryset = None
    serializer_class = None
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
