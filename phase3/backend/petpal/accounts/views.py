import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, ListAPIView
from .models import PetHubUser, ROLE_SEEKER, ROLE_SHELTER
from .serializers import RegisterUserSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .auth import UserIsUpdatingSelf
from applications.models import Application
from django.conf import settings

# Create your views here.
class AccountRegistrationView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        data = request.POST.dict()
        if data['role'] == 'shelter' and 'image' in request.FILES:
            data['image'] = request.FILES['image']

        serializer = RegisterUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            if user.role == 'shelter':
                address = f"{user.street_address}, {user.city}, {user.province}"
                lat, lng = self.get_lat_lng(address)
                if lat is not None and lng is not None:
                    user.lat = lat
                    user.lng = lng

            user.save()
            return Response({'message': 'Account created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)
        
    def get_lat_lng(self, address):
        params = {
            'address': address,
            'key': settings.GOOGLE_GEOCODING_API_KEY
        }
        response = requests.get('https://maps.googleapis.com/maps/api/geocode/json', params=params)
        if response.status_code == 200:
            data = response.json()
            if data['status'] == 'OK':
                location = data['results'][0]['geometry']['location']
                return location['lat'], location['lng']
        return None, None
        

class MeView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.is_anonymous:
            return Response({'message': 'User not found'}, status=404)

        serializer = self.serializer_class(user)
        return Response(serializer.data, status=200)

class AccountView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserIsUpdatingSelf]
    queryset = PetHubUser.objects.all()
    serializer_class = UpdateUserSerializer

    requested_role = None

    def get(self, request, pk):
        assert self.requested_role is not None, 'self.requested_role must be set by the sublcass before calling AccountView.get()'
        acc = PetHubUser.objects.filter(pk=pk)
        if acc.exists():
            acc = acc.first()
            if acc.role != self.requested_role:
                return Response({'message': f'{"Seeker" if self.requested_role == ROLE_SEEKER else "Shelter"} not found'}, status=404)

            # All shelters can be viewed by anyone, users can view themselves, shelters can view users that have an active application open
            if acc.role == ROLE_SHELTER \
                or acc == request.user:
                return Response(self.serializer_class(acc).data, status=200)
            elif acc.role == ROLE_SEEKER \
                and request.user.role == ROLE_SHELTER \
                    and Application.objects.filter(pet_listing__lister=request.user, applicant=acc, status="pending").exists():
                return Response(self.serializer_class(acc).data, status=200)
            else:
                return Response({'message': 'You do not have permission to view this account'}, status=401)
        else:
            return Response({'message': f'{"Seeker" if self.requested_role == ROLE_SEEKER else "Shelter"} not found'}, status=404)

        
    def delete(self, request, pk):
        if request.user.id == pk:
            request.user.delete()
            return Response({'message': 'Account deleted successfully'}, status=200)
        
        return Response({'error': 'You can not delete that account'}, status=401)
class ShelterView(AccountView):
    requested_role = ROLE_SHELTER

class SeekerView(AccountView):
    requested_role = ROLE_SEEKER

class SheltersListView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = PetHubUser.objects.filter(role=ROLE_SHELTER)
    serializer_class = UpdateUserSerializer

    def get(self, request):
        return Response(self.serializer_class(self.get_queryset(), many=True).data, status=200)