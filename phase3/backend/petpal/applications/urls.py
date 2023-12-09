from django.contrib import admin
from django.urls import path
from . import views
from comments.views import ApplicationCommentListAPIView, ApplicationCommentGetAPIView

urlpatterns = [
    path('petlisting/<int:pk>/application/', views.ApplicationCreateView.as_view()),
    path('application/<int:pk>/', views.ApplicationDetailView.as_view(), name='application-detail'),
    path('application/list/', views.ApplicationListView.as_view()),
    path('application/list/<str:status>/', views.ApplicationListViewFiltered.as_view()),
    path('application/<str:sort_by>/', views.ApplicationListViewSorted.as_view()),
    path('application/<int:application_id>/comments/', ApplicationCommentListAPIView.as_view()),
    path('application/<int:application_id>/comments/<int:comment_id>/', ApplicationCommentGetAPIView.as_view(), name='application-comment-detail'),
    path('application/<int:pk>/users/', views.ApplicationUsers.as_view())
]