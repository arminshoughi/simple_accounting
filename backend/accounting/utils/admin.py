from django.contrib import admin


class BaseModelAdmin(admin.ModelAdmin):
    exclude = ['created_at', 'updated_at', 'deleted_at', 'is_deleted']
