from django.db import IntegrityError
from django.db.models import ProtectedError
from django.utils import timezone

from utils.exceptions import ObjectNotFound, DbIntegrityError, ObjectDeleteProtected, ObjectDeleteRestricted


class BaseService:
    model = None

    def __init__(self, model):
        self.model = model

    @classmethod
    def get(cls, **kwargs):
        try:
            return cls.model.objects.get(is_deleted=False, **kwargs)
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
        return cls.model.objects.filter(is_deleted=False, **kwargs)

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
            return obj.save(updated_field=updated_field)
        except IntegrityError:
            raise DbIntegrityError

    @classmethod
    def delete(cls, obj):
        try:
            obj.is_deleted = True
            obj.deleted_at = timezone.now()
            obj.save()
        except ProtectedError:
            raise ObjectDeleteProtected
        except:
            raise ObjectDeleteRestricted
