from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path(f'account/', views.AccountRegistrationView.as_view()),
    path(f'account/<int:pk>/', views.AccountUpdateView.as_view()),
]
