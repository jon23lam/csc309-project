from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('application/<int:pk>/', views.ApplicationCreateView.as_view()),
    path('application/list/', views.ApplicationListView.as_view()),
    path('application/list/<str:status>/', views.ApplicationListViewFiltered.as_view()),
    path('application/<str:sort_by>/', views.ApplicationListViewSorted.as_view()),
]