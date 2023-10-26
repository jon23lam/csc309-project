from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PetHubUser
# Create your views here.
class AccountHandler(APIView):

    # Only to be used to create new accounts
    def post(self, request):
        
        if request.POST.get('role') not in ['seeker', 'shelter']:
            return Response({'message': 'Invalid user type'}, status=400)
        
        if request.POST.get('password') != request.POST.get('password_confirm'):
            return Response({'message': 'Passwords do not match'}, status=400)
        
        email = request.POST.get('email')
        user, created = PetHubUser.objects.get_or_create(pk=email)
        import pdb; pdb.set_trace()
        if created:
            user.update(request.POST)
            return Response({'message': 'Account created successfully'}, status=200)
        else:
            return Response({'message': 'User with that email already exists'}, status=400)
        


    # Only to be used to update account information
    def patch(self, request):
        if request.POST.get('role') not in ['seeker', 'shelter']:
            return Response({'message': 'Invalid user type'}, status=400)
        
        email = request.POST.get('email')
        try:
            user = PetHubUser.objects.get(email=email)
        except:
            return Response({'message': 'User with that email does not exist'}, status=400)
        user = user.update(request.POST)
        return Response({'message': 'Account updated successfully'}, status=200)