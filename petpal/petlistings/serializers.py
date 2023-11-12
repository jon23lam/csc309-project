from rest_framework import serializers
from .models import PetListing


class PetListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetListing
        fields = ('lister', 'name', 'animal', 'breed', 'sex', 'province', 'address', 'colour', 'age', 'weight', 'description', 'status')