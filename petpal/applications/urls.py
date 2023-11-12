from django.contrib import admin
from django.urls import path
from . import views
from comments.views import ApplicationCommentListAPIView, ApplicationCommentGetAPIView

urlpatterns = [
    path('application/<int:pet_listing>/', views.ApplicationCreateView.as_view()),
    path('application/<int:pet_listing>/<int:pk>/', views.ApplicationView.as_view(), name='application-detail'),
    path('application/list/', views.ApplicationListView.as_view()),
    path('application/list/<str:status>/', views.ApplicationListViewFiltered.as_view()),
    path('application/<str:sort_by>/', views.ApplicationListViewSorted.as_view()),
    path('application/<int:application_id>/comments/', ApplicationCommentListAPIView.as_view()),
    path('application/<int:application_id>/comments/<int:comment_id>/', ApplicationCommentGetAPIView.as_view(), name='application-comment-detail')
]