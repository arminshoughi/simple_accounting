from rest_framework import serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        service = None
        extra_kwargs = {}

    def create(self, validated_data):
        return self.Meta.service.create(**validated_data)

    def update(self, instance, validated_data):
        return self.Meta.service.update(instance, **validated_data)
