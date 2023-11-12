from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField
from .models import Notification
from django.urls import reverse
from accounts.models import PetHubUser


class NotificationSerializer(ModelSerializer):
    receiver = PrimaryKeyRelatedField(queryset=PetHubUser.objects.all())
    associated_link = SerializerMethodField() 

    class Meta:
        model = Notification
        fields = ('id', 'receiver', 'title', 'body_text', 'image', 'read', 'created_at', 'type', 'associated_id', 'application_id', 'shelter_id', 'pet_listing_id', 'associated_link')

    def create(self, validated_data):
        return Notification.objects.create(**validated_data)

    def get_associated_link(self, obj):
        request = self.context.get('request')
        if obj.type == 'shelter_comment' and obj.shelter_id != None and obj.associated_id != None:
            return request.build_absolute_uri(reverse('shelter-comment-detail', kwargs={'shelter_id': obj.shelter_id, 'comment_id': obj.associated_id}))
        elif obj.type == 'application_comment' and obj.application_id != None and obj.associated_id != None:
            return request.build_absolute_uri(reverse('application-comment-detail', kwargs={'application_id': obj.application_id, 'comment_id': obj.associated_id}))
        elif obj.type == 'application' and obj.pet_listing_id != None and obj.associated_id != None:
            return request.build_absolute_uri(reverse('application-detail', kwargs={'pk': obj.associated_id, 'pet_listing': obj.pet_listing_id}))
        elif obj.type == 'status_update':
            # Assuming 'status_update' notifications have a different or same detailed view
            # You might need to adjust the 'viewname' and 'kwargs' based on your URL configuration
            return request.build_absolute_uri(reverse('application-detail', kwargs={'pk': obj.associated_id}))
        else:
            return None
