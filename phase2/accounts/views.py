from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, ListAPIView
from .models import PetHubUser, ROLE_SEEKER, ROLE_SHELTER
from .serializers import RegisterUserSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .auth import UserIsUpdatingSelf
# Create your views here.
class AccountRegistrationView(APIView):

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.POST)
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            return Response({'message': 'Account created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)

class AccountView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserIsUpdatingSelf]
    queryset = PetHubUser.objects.all()
    serializer_class = UpdateUserSerializer

    def get(self, request, pk):
        acc = PetHubUser.objects.filter(pk=pk)
        if acc.exists():
            acc = acc.first()
            # All shelters can be viewed by anyone, users can view themselves, shelters can view users that have an active application open
            if acc.role == ROLE_SHELTER \
                or acc == request.user:
                return Response(self.serializer_class(acc).data, status=200)
            else:
                return Response({'message': 'You do not have permission to view this account'}, status=401)
        else:
            return Response({'message': 'Account not found'}, status=404)

class SheltersListView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = PetHubUser.objects.filter(role=ROLE_SHELTER)
    serializer_class = UpdateUserSerializer

    def get(self, request):
        return Response(self.serializer_class(self.get_queryset(), many=True).data, status=200)