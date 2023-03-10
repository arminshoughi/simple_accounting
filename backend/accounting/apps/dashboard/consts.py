from django.db import models
from django.utils.translation import gettext_lazy as _


class AccountTypeChoices(models.TextChoices):
    INPUT = "input", _("input")
    OUTPUT = "output", _("output")


class TagChoices(models.TextChoices):
    FOOD = "food", _("food")
    DRESS = "dress", _("dress")
    BILL = "bill", _("bill")
    RENT = "rent", _("rent")
    LEON = "leon", _("leon")
    SALARY = "salary", _("salary")
    CARS_AND_ACCESSORIES = "cars and accessories", _("cars and accessories")
    PAYMENT_TO_OTHER = "payment to other", _("payment to other")
    SERVICE = "service", _("service")
    HEALTH = "health", _("health")
    OTHER = "other", _("other")


class ReminderTypeChoices(models.TextChoices):
    CHECK = 'check', _('check')
    DEBT = 'debt', _('debt')


class ReminderTimeTypeChoices(models.TextChoices):
    ONE_DAY_BEFORE = 'one day before', _('one day before')
    TWO_DAY_BEFORE = 'two day before', _('two day before')
    THREE_DAY_BEFORE = 'three day before', _('three day before')
    WEEK_BEFORE = 'week before', _('week before')
    MONTH_BEFORE = 'month before', _('month before')
