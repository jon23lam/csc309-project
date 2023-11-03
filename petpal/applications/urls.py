from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('application/', views.ApplicationCreateView.as_view()),
    path('application/<int:pk>/', views.ApplicationView.as_view()),
    path('application/list/', views.ApplicationListView.as_view()),
]