from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path(f'account/', views.AccountHandler.as_view()),
]
