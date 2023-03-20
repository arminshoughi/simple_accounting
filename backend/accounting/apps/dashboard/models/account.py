from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from ..consts import AccountTypeChoices, TagChoices, ReminderTypeChoices, ReminderTimeTypeChoices

UserModel = get_user_model()


class AccountModel(models.Model):
    user = models.ForeignKey(to=UserModel, on_delete=models.CASCADE, related_name='accounts')
    title = models.CharField(verbose_name='title', max_length=256, null=False, blank=False)
    description = models.TextField(verbose_name='description', null=True, blank=True)
    amount = models.FloatField(verbose_name='amount', null=False, blank=False)
    typ = models.CharField(verbose_name='type', choices=AccountTypeChoices.choices, max_length=10)
    tag = models.CharField(verbose_name='tag', choices=TagChoices.choices, max_length=30)
    is_checked = models.BooleanField(verbose_name='is checked', default=False)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = 'account'
        verbose_name_plural = 'accounts'

    def __str__(self):
        return self.title


class ReminderModel(models.Model):
    user = models.ForeignKey(to=UserModel, on_delete=models.CASCADE, related_name='reminders')
    title = models.CharField(verbose_name='title', max_length=256, null=False, blank=False)
    description = models.TextField(verbose_name='description', null=True, blank=True)
    amount = models.FloatField(verbose_name='amount', null=False, blank=False)
    account_type = models.CharField(verbose_name='account type', choices=AccountTypeChoices.choices, max_length=10)
    reminder_type = models.CharField(verbose_name='reminder type', choices=ReminderTypeChoices.choices, max_length=10)
    time_choice = models.CharField(verbose_name='time choice', choices=ReminderTimeTypeChoices.choices, max_length=20)
    reminding_time = models.DateField(
        verbose_name='reminding time', blank=False, null=False, default=timezone.now().date()
    )
    is_visible = models.BooleanField(verbose_name='is visible', default=False)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = 'reminder'
        verbose_name_plural = 'reminders'

    def __str__(self):
        return self.title
