from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path(f'account/', views.AccountRegistrationView.as_view()),
    path(f'shelter/<int:pk>/', views.ShelterView.as_view()),
    path(f'seeker/<int:pk>/', views.SeekerView.as_view()),
    path(f'shelters/', views.SheltersListView.as_view()),
]
