from .base import *

ALLOWED_HOSTS = ['accounting.ir']
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": 'accounting_db',
        "USER": 'accounting_user',
        "PASSWORD": 'accounting_password@',
        "HOST": 'localhost',
        "PORT": "5432",
    }
}

DEBUG = False
