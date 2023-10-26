from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class AccountHandler(APIView):

    # Only to be used to create new accounts
    def post(self, request):
        return Response({'message': 'Hello, world!'})
    
    # Only to be used to update account information
    def patch(self, request):
        return Response({'message': 'Hello, world!'})