from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from utils.models import BaseModel

from .. import consts
from ..validators import UsernameValidator, NationalCodeValidator, PhoneValidator


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
    def default_phone(self):
        return self.phones.filter(is_default=True).first()

    @property
    def default_mobile(self):
        return self.mobiles.filter(is_default=True).first()

    @property
    def default_address(self):
        return self.addresses.filter(is_default=True).first()

    @property
    def default_emails(self):
        return self.emails.filter(is_default=True).first()


class UserPhoneModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='phones', on_delete=models.CASCADE)
    phone = models.CharField(verbose_name='Phone', max_length=11, validators=[PhoneValidator()])
    is_default = models.BooleanField(verbose_name='Default', default=False)

    def __str__(self):
        return self.phone


class UserMobileModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='mobiles', on_delete=models.CASCADE)
    mobile = models.CharField(verbose_name='Mobile', max_length=11, validators=[PhoneValidator()])
    is_default = models.BooleanField(verbose_name='Default', default=False)

    def __str__(self):
        return self.mobile


class UserAddressModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='addresses', on_delete=models.CASCADE)
    address = models.TextField(verbose_name='Address', null=False, blank=False)
    is_default = models.BooleanField(verbose_name='Default', default=False)

    def __str__(self):
        return self.address[:50]


class UserEmailModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='emails', on_delete=models.CASCADE)
    email = models.EmailField(verbose_name='Email', null=False, blank=False)
    is_default = models.BooleanField(verbose_name='Default', default=False)

    def __str__(self):
        return self.email
