from django.db import models
from django.conf import settings



class Notification(models.Model):
  receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  title = models.CharField(max_length=150)
  body_text = models.TextField()
  image = models.ImageField(blank=True)
  read = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  type = models.CharField(max_length=30, choices=(('comment', 'Comment'), ('application', 'Application'), ('status_update', "Status Update")))
  associated_id = models.IntegerField()

  class Meta:
    ordering = ['-created_at']

