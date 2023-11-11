from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Application
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, APIException
from accounts.models import PetHubUser

from .serializers import CreateApplicationSerializer, ApplicationUpdateSerializer, ApplicationListSerializer


# Create your views here.
class ApplicationCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['applicant'] = request.user.pk

        # TODO change this to get the shelter name from the pet listing object once its made
        data['shelter_name'] = request.user.shelter_name
        

        # TODO check if pet listing is available if not return an error

        serializer = CreateApplicationSerializer(data=data)
        if serializer.is_valid():
            application = serializer.save()
            return Response({'message': 'Application created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)


class ApplicationView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationUpdateSerializer

    def update(self, request, *args, **kwargs):
        application = self.get_object()

        # TODO check if the shelter on the pet listing matches the shelter on the application
        if request.user.role == 'shelter':
            serializer = self.get_serializer(application, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {'detail': 'Permission denied. Only users with role shelter can update this application.'},
                status=status.HTTP_403_FORBIDDEN)

    def get(self, request, pk):
        app = Application.objects.filter(pk=pk)
        if app.exists():
            app = app.first()

            if app.applicant == request.user \
                    or app.pet_listing.shelter == request.user:
                return Response(self.serializer_class(app).data, status=200)
            else:
                return Response({'message': 'You do not have permission to view this application'}, status=401)
        else:
            return Response({'message': 'Application not found'}, status=404)


class ApplicationListView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        if user.role == 'seeker':
            raise PermissionDenied(detail='You are not allowed to view applications', code=status.HTTP_401_UNAUTHORIZED)

        # TODO uncomment this and search for the objects that have the respective shelter name in the application
        # queryset = Application.objects.filter(shelter_name=user.shelter_name)
        queryset = Application.objects.all()

        return queryset


class ApplicationListViewFiltered(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer

    def get_queryset(self, *args, **kwargs):

        user = self.request.user

        if user.role == 'seeker':
            raise PermissionDenied(detail='You are not allowed to view applications', code=status.HTTP_401_UNAUTHORIZED)

        app_status = self.kwargs['status']
        if status is not None:
            return Application.objects.filter(status=app_status)


        else:
            error_message = "No applications found with status: " + app_status + "."
            raise APIException({'error': error_message})


class ApplicationListViewSorted(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer

    def get_queryset(self):

        user = self.request.user
        if user.role == 'seeker':
            raise PermissionDenied(detail='You are not allowed to view applications', code=status.HTTP_401_UNAUTHORIZED)

        sort_by = self.kwargs['sort_by']

        if sort_by == 'created':
            queryset = Application.objects.all().order_by('-created_at')
        elif sort_by == 'updated':
            queryset = Application.objects.all().order_by('-last_updated')
        else:
            error_message = f"'{sort_by}' is not a valid sort method. Use 'created' or 'updated'."
            raise APIException({'error': error_message})

        return queryset
