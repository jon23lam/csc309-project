from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Notification
from accounts.models import PetHubUser

class NotificationSerializer(ModelSerializer):
  receiver = PrimaryKeyRelatedField(queryset=PetHubUser.objects.all())

  class Meta:
    model = Notification
    fields = '__all__'

  def create(self, validated_data):
    return Notification.objects.create(**validated_data)

