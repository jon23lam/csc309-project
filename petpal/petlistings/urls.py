from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetListingView

router = DefaultRouter()
router.register(r'', PetListingView, basename='')

urlpatterns = [
    path('', include(router.urls))
]