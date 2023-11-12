from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Application
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, APIException, NotFound

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .serializers import CreateApplicationSerializer, ApplicationUpdateSerializer, ApplicationListSerializer

from accounts.models import PetHubUser
from petlistings.models import PetListing


# Create your views here.
class ApplicationCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_application(self, pk):
        try:
            return Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return None

    def get_pet_listing(self, pk):
        try:
            return PetListing.objects.get(pk=pk)
        except PetListing.DoesNotExist:
            return None

    def post(self, request, pk):
        data = request.data.copy()

        try:
            applicant = PetHubUser.objects.get(pk=self.request.user.pk)
        except PetHubUser.DoesNotExist:
            return Response({'error': 'Applicant does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        data['applicant'] = applicant.id

        try:
            pet_listing = PetListing.objects.get(pk=pk)
        except PetListing.DoesNotExist:
            return Response({'error': ' The pet you are looking to adopt is either already adopted'
                                      ' or does not exist'},
                            status=status.HTTP_400_BAD_REQUEST)

        data['pet_listing'] = pet_listing.id



        data['shelter_name'] = pet_listing.lister.shelter_name



        if pet_listing.status != 'Available':
            return Response({'error': 'PetListing is not available'},
                            status=status.HTTP_400_BAD_REQUEST)


        serializer = CreateApplicationSerializer(data=data)
        if serializer.is_valid():
            application = serializer.save()
            return Response({'message': 'Application created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)

class ApplicationDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_application(self, pk):
        try:
            return Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return None

    def get_pet_listing(self, pk):
        try:
            return PetListing.objects.get(pk=pk)
        except PetListing.DoesNotExist:
            return None

    def get(self, request, pk):
        try:
            application = self.get_application(pk)

            if application:
                if application.applicant == request.user or application.pet_listing.lister == request.user:
                    serializer = ApplicationUpdateSerializer(application)
                    return Response(serializer.data, status=status.HTTP_200_OK)

                elif application.pet_listing.lister == request.user:
                    serializer = ApplicationUpdateSerializer(application)
                    return Response(serializer.data, status=status.HTTP_200_OK)

                else:
                    raise PermissionDenied(detail='You do not have permission to view this application',
                                           code=status.HTTP_401_UNAUTHORIZED)
            else:
                raise NotFound(detail='Application not found', code=status.HTTP_404_NOT_FOUND)

        except PermissionDenied as e:
            return Response({'message': str(e)}, status=e.status_code)
        except NotFound as e:
            return Response({'message': str(e)}, status=e.status_code)
        except Exception as e:
            return Response({'message': 'Unexpected error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        application = self.get_application(pk)

        if not application:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)


        application = self.get_application(pk)
        pet_listing = self.get_pet_listing(application.pet_listing.id)


        if request.user.role == 'shelter' and pet_listing.lister == request.user:
            serializer = ApplicationUpdateSerializer(application, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.user.role == 'seeker' and application.applicant == request.user and request.data.get('status') == "withdrawn":
            serializer = ApplicationUpdateSerializer(application, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {'detail': 'Permission denied. Only users with role shelter can update this application.'},
                status=status.HTTP_403_FORBIDDEN)

class ApplicationListView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer
    queryset = Application.objects.all()

    def list(self, request, *args, **kwargs):
        user = self.request.user

        if user.role != 'shelter':
            raise PermissionDenied(detail='You are not allowed to view applications', code=403)

        try:


            queryset = self.filter_queryset(self.get_queryset().filter(shelter_name=user.shelter_name))

            items_per_page = 10
            paginator = Paginator(queryset, items_per_page)

            page = self.request.query_params.get('page')
            try:
                paginated_queryset = paginator.page(page)
            except PageNotAnInteger:
                paginated_queryset = paginator.page(1)
            except EmptyPage:
                paginated_queryset = []

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response(serializer.data)

        except Exception as e:
            raise PermissionDenied(detail='Unable to find applications', code=404) from e


class ApplicationListViewFiltered(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer
    queryset = Application.objects.all()

    def list(self, request, *args, **kwargs):
        user = self.request.user

        if user.role == 'seeker':
            raise PermissionDenied(detail='You are not allowed to view applications', code=status.HTTP_401_UNAUTHORIZED)

        app_status = self.kwargs.get('status')
        if app_status is not None:
            queryset = self.filter_queryset(self.get_queryset().filter(status=app_status, shelter_name=user.shelter_name))

            items_per_page = 10
            paginator = Paginator(queryset, items_per_page)

            page = self.request.query_params.get('page')
            try:
                paginated_queryset = paginator.page(page)
            except PageNotAnInteger:
                paginated_queryset = paginator.page(1)
            except EmptyPage:
                paginated_queryset = []

            serializer = self.get_serializer(paginated_queryset, many=True)
            return Response(serializer.data)

        else:
            error_message = "No applications found with status: " + app_status + "."
            raise APIException({'error': error_message})


class ApplicationListViewSorted(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationListSerializer
    queryset = Application.objects.all()  # Set the base queryset

    def list(self, request, *args, **kwargs):
        user = self.request.user

        if user.role == 'seeker':
            raise PermissionDenied(detail='You are not allowed to view applications', code=status.HTTP_401_UNAUTHORIZED)

        sort_by = self.kwargs['sort_by']

        if sort_by == 'created':
            queryset = self.filter_queryset(self.get_queryset().filter(shelter_name=user.shelter_name).order_by('-created_at'))
        elif sort_by == 'updated':
            queryset = self.filter_queryset(self.get_queryset().filter(shelter_name=user.shelter_name).order_by('-last_updated'))
        else:
            error_message = f"'{sort_by}' is not a valid sort method. Use 'created' or 'updated'."
            raise APIException({'error': error_message})

        items_per_page = 10
        paginator = Paginator(queryset, items_per_page)

        page = self.request.query_params.get('page')
        try:
            paginated_queryset = paginator.page(page)
        except PageNotAnInteger:
            paginated_queryset = paginator.page(1)
        except EmptyPage:
            paginated_queryset = []

        serializer = self.get_serializer(paginated_queryset, many=True)
        return Response(serializer.data)
