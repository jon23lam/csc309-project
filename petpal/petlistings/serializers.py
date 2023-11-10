from rest_framework import serializers
from .models import PetListing


class PetListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetListing
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        pet_listing = PetListing.objects.create(lister=user, **validated_data)
        return pet_listing
