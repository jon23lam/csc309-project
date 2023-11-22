from rest_framework.permissions import BasePermission

class UserIsUpdatingSelf(BasePermission):

    message = "You do not have permission to update this user."

    def has_object_permission(self, request, view, obj):
        return request.user == obj