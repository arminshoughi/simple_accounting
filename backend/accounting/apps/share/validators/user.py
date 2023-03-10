import re
from django.utils.deconstruct import deconstructible
from django.core import validators


@deconstructible
class UsernameValidator(validators.RegexValidator):
    regex = r'^[\w.]+$'
    message = 'یک نام کاربری معتبر وارد کنید. این مقدار میتواند فقط شامل ' \
              'حروف الفبای انگلیسی، اعداد، و علامات . و _ باشد.'
    flags = re.ASCII


@deconstructible
class NationalCodeValidator(validators.RegexValidator):
    regex = r'^\d{10}$'
    message = 'کد ملی معتبر نمی باشد.'


@deconstructible
class PhoneValidator(validators.RegexValidator):
    regex = r'^\d{3,12}$'
    message = 'تلفن معتبر نمی باشد.'
