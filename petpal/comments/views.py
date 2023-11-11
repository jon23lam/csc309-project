from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.pagination import PageNumberPagination
from .models import Comment
from applications.models import Application
from accounts.models import PetHubUser
from rest_framework.serializers import ValidationError
from .serializers import CommentSerializer


class CommentListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, shelter_id):
        # Logic to create a comment for a shelter
        # Ensure the commenter is a logged in user/shelter
        # ...
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(shelter_id=shelter_id, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, shelter_id):
        # Logic to list comments for a shelter
        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 10
        comments = Comment.objects.filter(shelter_id=shelter_id)
        result_page = paginator.paginate_queryset(comments, request)
        serializer = CommentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class ApplicationCommentListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, application_id):
        # Logic to ensure only specific shelter and pet seeker can see the comments
        # ...
        application = Application.objects.get(id=application_id)

        if request.user.role == 'seeker' and application.applicant != request.user:
            raise ValidationError(
                {'seeker': 'You do not have access to this application'})
        
        if request.user.role == 'shelter' and application.shelter != request.use:
            raise ValidationError(
                {'shelter': 'You do not have access to this application'})
        
        comments = application.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    def post(self, request, application_id):
        application = Application.objects.get(id=application_id)

        if request.user.role == 'seeker' and application.applicant != request.user:
            raise ValidationError(
                {'seeker': 'You do not have access to this application'})
        
        if request.user.role == 'shelter' and application.shelter != request.use:
            raise ValidationError(
                {'shelter': 'You do not have access to this application'})
        
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(application_id=application_id, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
