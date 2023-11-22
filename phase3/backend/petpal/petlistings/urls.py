from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.PetListingView.as_view()),
    path('<int:pk>/', views.PetListingView.as_view()),
    path('list/', views.PetListingListView.as_view()),
]