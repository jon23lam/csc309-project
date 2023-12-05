from rest_framework import serializers
from .models import StrayAnimal


class StrayAnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrayAnimal
        fields = '__all__'
