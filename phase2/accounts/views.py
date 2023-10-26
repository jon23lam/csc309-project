from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from .models import PetHubUser
from .serializers import RegisterUserSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .auth import UserIsUpdatingSelf
# Create your views here.
class AccountRegistrationView(APIView):

    def post(self, request):
        import pdb; pdb.set_trace()
        serializer = RegisterUserSerializer(data=request.POST)
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            return Response({'message': 'Account created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)

class AccountUpdateView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, UserIsUpdatingSelf]
    queryset = PetHubUser.objects.all()
    serializer_class = UpdateUserSerializer
