from utils.common import camel_to_snake


class AppException(Exception):
    code = 'error'
    message = 'خطای سمت سرور به وجود آمد'
    status = 400
    field_pattern = False

    def __init__(self, field_pattern=False):
        self.field_pattern = field_pattern
        app = self.__class__.__module__.split('.')[1]
        self.code = app + '_' + camel_to_snake(type(self).__name__)

    def __str__(self):
        return '{}: {}'.format(self.code, self.message)


class ObjectNotFound(AppException):
    def __init__(self, model):
        self.message = "%s مورد نظر یافت نشد." % model._meta.verbose_name
        app = self.args[0].__module__.split('.')[1]
        self.code = "%s_%s_not_found" % (app, camel_to_snake(model._meta.object_name))
        self.status = 404
        self.field_name = model._meta.object_name.lower() + '_id'


class DbIntegrityError(AppException):
    def __init__(self, model):
        self.message = "به دلیل حفظ جامعیت بانک اطلاعاتی امکان انجام این عمل وجود ندارد."
        self.code = "%s_integrity_error" % model._meta.object_name.lower()
        self.status = 400
        self.field_name = model._meta.object_name.lower() + '_id'


class ObjectDeleteProtected(AppException):
    message = 'با توجه به وجود وابستگی، امکان حذف وجود ندارد.'
    code = 'object_delete_protected'
    status = 400


class ObjectDeleteRestricted(AppException):
    message = 'امکان حذف وجود ندارد.'
    code = 'object_delete_restricted'
    status = 400
