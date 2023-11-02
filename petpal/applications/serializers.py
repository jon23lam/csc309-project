from rest_framework.serializers import ModelSerializer, ValidationError, CharField
from .models import Application

class CreateApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ('applicant', 'pet_listing', 'occupation', 'salary', 'existing_pets', 'home_yard', 'safe_guard', 'message')

    def validate(self, data):
        if data['applicant'].role != 'seeker':
            raise ValidationError({'applicant': 'Applicant must be a seeker'})
        if data['pet_listing'].status != 'available':
            raise ValidationError({'pet_listing': 'Pet must be available'})
        return super().validate(data)


class ApplicationUpdateSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
        read_only_fields = ['applicant', 'pet_listing', 'occupation', 'salary', 'existing_pets', 'home_yard',
                            'safe_guard', 'message']



