from rest_framework.serializers import ModelSerializer, ValidationError, CharField
from .models import Application


class CreateApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application

        # Add back pet listing once its created
        fields = ('applicant', 'pet_listing', 'occupation', 'salary', 'existing_pets', 'home_yard', 'safe_guard', 'message', 'shelter_name', 'shelter')

    def validate(self, data):
        if data['applicant'].role != 'seeker':
            raise ValidationError({'applicant': 'Applicant must be a seeker'})
        if data['pet_listing'].status != 'Available':
            raise ValidationError({'pet_listing': 'Pet must be available'})
        return super().validate(data)


class ApplicationUpdateSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['applicant', 'pet_listing', 'id', 'shelter_name', 'occupation', 'salary',
                            'created_at', 'last_updated', 'existing_pets', 'home_yard', 'safe_guard', 'message']

class ApplicationListSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
