from django.contrib import admin
from django.urls import path
from . import views
from comments.views import ApplicationCommentListAPIView

urlpatterns = [
    path(f'account/', views.AccountRegistrationView.as_view()),
    path(f'shelter/<int:pk>/', views.ShelterView.as_view()),
    path(f'seeker/<int:pk>/', views.SeekerView.as_view()),
    path(f'shelters/', views.SheltersListView.as_view()),
    path(f'shelters/<int:pk>/coments/', ApplicationCommentListAPIView.as_view()),
]
