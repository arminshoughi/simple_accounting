from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models import Sum, FloatField
from django.db.models.functions import Coalesce

from utils.models import BaseModel

from .. import consts
from ..validators import UsernameValidator, NationalCodeValidator, PhoneValidator
from ...dashboard.consts import AccountTypeChoices


class UserManagement(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, password):
        return self.create_user(
            username=username, password=password, is_superuser=True, is_active=True
        )


class UserModel(AbstractBaseUser, BaseModel):
    username = models.CharField(
        verbose_name='Username', max_length=150, validators=[UsernameValidator()], unique=True,
        error_messages={'unique': 'Sorry, this username already token.'}
    )
    first_name = models.CharField(verbose_name='First name', max_length=128, null=False, blank=False)
    last_name = models.CharField(verbose_name='Last name', max_length=256, null=False, blank=False)
    national_code = models.CharField(
        verbose_name='National code', max_length=10, validators=[NationalCodeValidator()], null=True, blank=True
    )
    birthday = models.DateField(verbose_name='Birthday', null=True, blank=True)
    sex = models.CharField(verbose_name='Sex', choices=consts.SEX_TYPE_CHOICES, default=consts.MALE, max_length=6)
    is_superuser = models.BooleanField(verbose_name='Superuser', default=False)
    is_staff = models.BooleanField(verbose_name='Staff', default=False)
    is_active = models.BooleanField(verbose_name='Active', default=True)
    last_login = models.DateTimeField(verbose_name='Last login', null=True, blank=True)
    updated_at = models.DateTimeField(verbose_name='Last update', null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='Created at', auto_now_add=True)

    objects = UserManagement()
    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def display_name(self):
        return f'{self.first_name} {self.last_name}'

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_staff(self):
        return self.is_superuser

    @property
    def inventory(self):
        input_amount = self.accounts.filter(
            typ=AccountTypeChoices.INPUT, is_draft=False
        ).aggregate(sum=Coalesce(Sum('amount'), 0, output_field=FloatField()))["sum"]
        output_amount = self.accounts.filter(
            typ=AccountTypeChoices.OUTPUT, is_draft=False
        ).aggregate(sum=Coalesce(Sum('amount'), 0, output_field=FloatField()))["sum"]
        return input_amount - output_amount
