from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.pagination import PageNumberPagination
from .models import Comment
from applications.models import Application
from accounts.models import PetHubUser
from rest_framework.serializers import ValidationError
from .serializers import CommentSerializer


class ShelterCommentListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        data = request.data.copy()
        data['author'] = request.user.id
        
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(shelter_id=pk, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        paginator = PageNumberPagination()
        paginator.page_size = 10
        comments = Comment.objects.filter(shelter_id=pk)
        result_page = paginator.paginate_queryset(comments, request)
        serializer = CommentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ApplicationCommentListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        application = Application.objects.get(id=pk)

        if request.user.role == 'seeker' and application.applicant != request.user:
            raise ValidationError(
                {'seeker': 'You do not have access to this application'})
        
        if request.user.role == 'shelter' and application.shelter != request.use:
            raise ValidationError(
                {'shelter': 'You do not have access to this application'})
        
        paginator = PageNumberPagination()
        paginator.page_size = 10

        paginated_queryset = paginator.paginate_queryset(application.comments.all(), request)
        serializer = CommentSerializer(paginated_queryset, many=True)

        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request, pk):
        application = Application.objects.get(id=pk)

        if request.user.role == 'seeker' and application.applicant != request.user:
            raise ValidationError(
                {'seeker': 'You do not have access to this application'})
        
        if request.user.role == 'shelter' and application.shelter != request.use:
            raise ValidationError(
                {'shelter': 'You do not have access to this application'})
        
        data = request.data.copy()
        data['author'] = request.user.id

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(application_id=pk, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
