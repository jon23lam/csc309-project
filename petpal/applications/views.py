from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Application

from .serializers import CreateApplicationSerializer, ApplicationUpdateSerializer


# Create your views here.
class ApplicationCreateView(APIView):

    def post(self, request):
        data = request.data.copy()
        data['applicant'] = request.user.id

        serializer = CreateApplicationSerializer(data=data)
        if serializer.is_valid():
            application = serializer.save()
            return Response({'message': 'Application created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)



class ApplicationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationUpdateSerializer

    def get(self, request, pk):
        app = Application.objects.filter(pk=pk)
        if app.exists():
            app = app.first()

            if app.applicant == request.user \
                    or app.pet_listing.shelter == request.user \
                    or request.user.role == 'admin':
                return Response(self.serializer_class(app).data, status=200)
            else:
                return Response({'message': 'You do not have permission to view this application'}, status=401)
        else:
            return Response({'message': 'Application not found'}, status=404)
