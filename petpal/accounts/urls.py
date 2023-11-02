from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path(f'account/', views.AccountRegistrationView.as_view()),
    path(f'account/<int:pk>/', views.AccountView.as_view()),
    path(f'shelters/', views.SheltersListView.as_view()),
]
