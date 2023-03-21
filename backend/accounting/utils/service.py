from django.db import IntegrityError, connection
from django.db.models import ProtectedError
from django.utils import timezone

from utils.exceptions import ObjectNotFound, DbIntegrityError, ObjectDeleteProtected, ObjectDeleteRestricted


class BaseService:
    model = None

    def __init__(self, model):
        self.model = model

    @classmethod
    def truncate(cls):
        with connection.cursor() as cursor:
            cursor.execute(f'TRUNCATE TABLE {cls.model._meta.db_table} CASCADE')

    @classmethod
    def get(cls, **kwargs):
        try:
            return cls.model.objects.get(**kwargs)
        except (cls.model.DoesNotExists, ValueError):
            raise ObjectNotFound(cls.model)

    @classmethod
    def get_by_id(cls, id):
        try:
            return cls.get(id=id)
        except (cls.model.DoesNotExists, ValueError):
            raise ObjectNotFound(cls.model)

    @classmethod
    def filter(cls, **kwargs):
        return cls.model.objects.filter(**kwargs)

    @classmethod
    def all(cls):
        return cls.filter().order_by('-created_at')

    @classmethod
    def first(cls, **kwargs):
        return cls.filter(**kwargs).first()

    @classmethod
    def exists(cls, **kwargs):
        return cls.filter(**kwargs).exists()

    @classmethod
    def create(cls, **kwargs):
        try:
            return cls.model.objects.create(**kwargs)
        except IntegrityError:
            raise DbIntegrityError(cls.model)

    @classmethod
    def get_or_create(cls, **kwargs):
        try:
            return cls.model.objects.get_or_create(**kwargs)
        except IntegrityError:
            raise DbIntegrityError(cls.model)

    @classmethod
    def update(cls, obj, **kwargs):
        updated_field = []

        for k, v in kwargs.items():
            if hasattr(obj, k):
                setattr(obj, k, v)
                updated_field.append(k)

        if hasattr(obj, 'updated_at'):
            obj.updated_at = timezone.now()
            updated_field.append('updated_at')

        try:
            obj.save(update_fields=updated_field)
            return obj
        except IntegrityError:
            raise DbIntegrityError

    @classmethod
    def delete(cls, obj):
        try:
            obj.delete()
        except ProtectedError:
            raise ObjectDeleteProtected
        except:
            raise ObjectDeleteRestricted
