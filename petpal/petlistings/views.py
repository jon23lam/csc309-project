from django.shortcuts import render
from rest_framework import viewsets
from .models import PetListing
from .serializers import PetListingSerializer


# Create your views here.
class PetListingView(viewsets.ModelViewSet):
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer
