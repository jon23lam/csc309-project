from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from accounts.models import ROLE_SEEKER
from .models import StrayAnimal
from .serializers import StrayAnimalSerializer

from math import cos, asin, sqrt


class StrayAnimalView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = StrayAnimal.objects.all()
    serializer_class = StrayAnimalSerializer

    def get(self, request, pk):
        animals = self.queryset.filter(pk=pk)
        if animals.exists():
            stray_animal = animals.first()
            serializer = self.serializer_class(
                instance=stray_animal, context={'request': request})
            return Response(serializer.data, status=200)
        else:
            return Response({"error": "Stray Animal does not exist"}, status=404)

    def patch(self, request, pk):
        animals = self.queryset.filter(pk=pk)
        if animals.exists():
            stray_animal = animals.first()
            serializer = self.serializer_class(
                stray_animal, data={**request.POST.dict()}, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response({"error": "Stray animal report does not exist"}, status=404)
        else:
            return Response({"error": "Stray animal report does not exist"}, status=404)


class StrayAnimalListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    # queryset = StrayAnimal.objects.all()
    serializer_class = StrayAnimalSerializer
    supported_keys = {"reporter", "lat", "lng", "radius"}

    # This measures the distance form the center lat/lng to the animal lat/lng and returns the distance in meters
    def distance(self, center_lat, center_lng, animal_lat, animal_lng):
      p = 0.017453292519943295 
      a = 0.5 - cos((animal_lat - center_lat) * p)/2 + cos(center_lat * p) * cos(animal_lat * p) * (1 - cos((animal_lng - center_lng) * p)) / 2
      return 12742 * asin(sqrt(a))
    
    def get(self, request, *args, **kwargs):
        reporter_id = request.query_params.get('reporter', None)
        lat = request.query_params.get('lat', None)
        lng = request.query_params.get('lng', None)
        radius = request.query_params.get('radius', None)

        stray_animals = StrayAnimal.objects.all()

        if reporter_id:
            stray_animals = StrayAnimal.objects.filter(reporter=reporter_id)
        elif lat and lng and radius:
            lat = float(lat)
            lng = float(lng)
            radius = float(radius)

            # Apparently this isn't optimized for big datasets but we will revisit
            stray_animals = [animal for animal in stray_animals if self.distance(lat, lng, animal.lat, animal.lng) <= radius]

        serializer = self.serializer_class(stray_animals, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.role == ROLE_SEEKER:
            return Response({"error": "Only seekers can create stray animal reports"})

        serializer = self.serializer_class(
            data={"reporter": request.user.id, **request.POST.dict()})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    
