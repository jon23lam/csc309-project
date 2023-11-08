from rest_framework.permissions import BasePermission, SAFE_METHODS

class ValidateUserNotification(BasePermission):
    # Checks if the current user has permission to access that notification
    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS or request.method == "POST":
            return True
        
        return obj.receiver == request.user