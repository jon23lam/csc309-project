from rest_framework.response import Response
from rest_framework import permissions, filters
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from .serializers import NotificationSerializer
from .models import Notification
from accounts.models import PetHubUser
from rest_framework.serializers import ValidationError
from .permissions import ValidateUserNotification


class NotificationListCreate(ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, ValidateUserNotification]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['created_at']
    search_fields = ['read']

    def perform_create(self, serializer):
        receiver_id = self.request.data.get('receiver')

        if not receiver_id:
            raise ValidationError(
                {'receiver': 'Must have a reciever for the notification'})

        try:
            receiver = PetHubUser.objects.get(id=receiver_id)
        except PetHubUser.DoesNotExist:
            raise ValidationError({'receiver': 'User does not exist.'})

        serializer.save(receiver=receiver)

    def get_queryset(self):
        queryset = Notification.objects.filter(receiver=self.request.user)
        read_param = self.request.query_params.get('read')

        if read_param is not None: 
            read_value = read_param.lower() == 'true'
            queryset = queryset.filter(read=read_value)
        return queryset
  

class NotificationRetrieveDestroy(RetrieveDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return notifications for the current user only
        return Notification.objects.filter(receiver=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        notification = self.get_object()
        # Mark as read if it's not already
        if not notification.read:
            notification.read = True
            notification.save(update_fields=['read'])
        serializer = self.get_serializer(notification, context={'request': request})
        return Response(serializer.data)

    def get_object(self):
        # You can also add additional logic here if needed to filter objects
        obj = super().get_object()
        # Perform custom actions here, like checking permissions specific to the object
        return obj
