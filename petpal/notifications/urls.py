from django.urls import path
from . import views

urlpatterns = [
  path('', views.NotificationListCreate.as_view()),
  path('<int:pk>/', views.NotificationRetrieveDestroy.as_view())
]
