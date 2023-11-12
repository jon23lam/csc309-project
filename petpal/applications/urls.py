from django.contrib import admin
from django.urls import path
from . import views
from comments.views import ApplicationCommentListAPIView

urlpatterns = [
    path('application/<int:pet_listing>/', views.ApplicationCreateView.as_view()),
    path('application/<int:pet_listing>/<int:pk>/', views.ApplicationView.as_view()),
    path('application/list/', views.ApplicationListView.as_view()),
    path('application/list/<str:status>/', views.ApplicationListViewFiltered.as_view()),
    path('application/<str:sort_by>/', views.ApplicationListViewSorted.as_view()),
    path('application/<int:pk>/comments/', ApplicationCommentListAPIView.as_view())
]