from django.db import models
from django.conf import settings
from accounts.models import PetHubUser
from applications.models import Application

class Comment(models.Model):
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  shelter = models.ForeignKey(PetHubUser, related_name='comments', on_delete=models.CASCADE, null=True, blank=True)
  application = models.ForeignKey(Application, related_name='comments', on_delete=models.CASCADE, null=True, blank=True)
  author = models.ForeignKey(PetHubUser, on_delete=models.CASCADE)
  rating = models.IntegerField(blank=True, null=True)

  class Meta: 
    ordering = ['created_at']