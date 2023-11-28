from django.shortcuts import render
from rest_framework.views import APIView
from .models import PetListing, STATUS_AVAILABLE
from .serializers import PetListingSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from accounts.models import ROLE_SHELTER, PetHubUser
from rest_framework.pagination import PageNumberPagination



# Create your views here.

class PetListingView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer

    def get(self, request, pk):
        listings = self.queryset.filter(pk=pk)
        if listings.exists():
            pet_listing = listings.first()
            serializer = self.serializer_class(instance=pet_listing, context={'request': request})
            return Response(serializer.data, status=200)
        else:
            return Response({"error": "Pet listing does not exist"}, status=404)

    def post(self, request):
        if not request.user.role == ROLE_SHELTER:
            return Response({"error": "Only shelters can create pet listings"}, status=403)

        serializer = self.serializer_class(data={"lister":request.user.id, **request.POST.dict(), "image":request.FILES['image']})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Pet listing created successfully'}, status=200)
        else:
            return Response(serializer.errors, status=400)
        
    def patch(self, request, pk):
        listings = self.queryset.filter(pk=pk)
        if listings.exists():
            pet_listing = listings.first()
            if pet_listing.lister != request.user:
                return Response({"error": "Only the lister can edit the pet listing"}, status=401)
            if 'image' in request.FILES:
                serializer = self.serializer_class(pet_listing, data={**request.POST.dict(), "image":request.FILES['image']}, partial=True)
            else: 
                serializer = self.serializer_class(pet_listing, data={**request.POST.dict()}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Pet listing updated successfully'}, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({"error": "Pet listing does not exist"}, status=404)
        
    def delete(self, request, pk):
        listings = self.queryset.filter(pk=pk)
        if listings.exists():
            pet_listing = listings.first()
            if pet_listing.lister != request.user:
                return Response({"error": "Only the lister can edit the pet listing"}, status=401)
            else:
                pet_listing.delete()
                return Response({'message': 'Pet listing deleted successfully'}, status=200)
        else:
            return Response({"error": "Pet listing does not exist"}, status=404)

class PetListingListView(APIView):
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer
    supported_keys = {"animal", "breed", "lister", "status"}
    supported_sorters = {"name", "age", "created_at"}
    supported_sort_directions = {"asc", "desc"}

    def parse_filters(self, request):
        filter_str = request.GET.get('filters')
        if not filter_str:
            return {}
        filters = {}
        filter_str = filter_str[1:-1]

        if filter_str.count('[') or filter_str.count(']'):
            return None
        keyvals = filter_str.split(',')
        for keyval in keyvals:
            if keyval.count(':') != 1:
                return None
            key, value = keyval.split(':')
            if key in filters or key not in self.supported_keys:
                return None
            
            if key == "lister":
                try:
                    filters[key] = PetHubUser.objects.get(pk=int(value))
                except:
                    return None
            else:
                filters[key] = value

        return filters

    def parse_sort_by(self, request):
        sort_params = request.GET.get('sort_by')
        if sort_params is None:
            return None, None
        
        sort_by, order = sort_params.split(':')

        if sort_by not in self.supported_sorters or order not in self.supported_sort_directions:
            return "error", None
        
        return sort_by, order

    def get(self, request):
        filters = self.parse_filters(request)
        if filters is None:
            return Response({"error": "Invalid filters"}, status=400)
        
        if "status" not in filters:
            filters["status"] = STATUS_AVAILABLE
        
        if filters["status"] == "any":
            filters.pop("status")

        if "animal" in filters and filters["animal"] == "any":
            filters.pop("animal")

        sort_by, order = self.parse_sort_by(request)

        if sort_by is not None:
            if sort_by == "error":
                return Response({"error": f"Invalid sort_by, sortable fields include {self.supported_sorters}. Supported sort directions include: {self.supported_sort_directions}"}, status=400)
            listings = self.queryset.filter(**filters).order_by(f"{'-' if order == 'desc' else ''}{sort_by}")
        else:
            listings = self.queryset.filter(**filters)

        paginator = PageNumberPagination()
        paginator.page_size = 10

        listings = paginator.paginate_queryset(listings, request)

        serializer = self.serializer_class(listings, context={'request': request}, many=True)
        return paginator.get_paginated_response(serializer.data)
