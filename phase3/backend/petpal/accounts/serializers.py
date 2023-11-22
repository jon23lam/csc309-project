from rest_framework.serializers import ModelSerializer, ValidationError, CharField
from .models import PetHubUser


class RegisterUserSerializer(ModelSerializer):
    password_confirm = CharField()
    class Meta:
        model = PetHubUser
        fields = ('id', 'email', 'role', 'password', 'password_confirm', 'first_name', 'last_name', 'gender', 'dob', 'postal_code', 'image', 'shelter_name', 'street_address', 'city', 'province', 'open_time', 'close_time')

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise ValidationError({'password': 'Passwords do not match'})
        data.pop("password_confirm")
        return super().validate(data)
    

class UpdateUserSerializer(ModelSerializer):

    class Meta:
        model = PetHubUser
        fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'dob', 'postal_code', 'image', 'shelter_name', 'street_address', 'city', 'province', 'open_time', 'close_time')
        extra_kwargs = {'email': {'required': False}}
    
    def validate_email(self, email):
        if self.instance.email != email and PetHubUser.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        return email