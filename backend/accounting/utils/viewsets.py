class UserRelatedDataRestricted(object):
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
