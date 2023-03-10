from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.AccountModel)
class AccountModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('user', 'title', 'amount', 'typ', 'tag', 'is_draft')
    list_filter = ('typ', 'tag')


@admin.register(models.ReminderModel)
class ReminderModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('title',)
    list_display = ('user', 'title', 'amount', 'account_type', 'reminder_type', 'time_choice')
    list_filter = ('account_type', 'reminder_type')
