from django.db import models
from django.conf import settings



class Notification(models.Model):
  receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  title = models.CharField(max_length=150)
  body_text = models.TextField()
  image = models.ImageField(blank=True)
  read = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  type = models.CharField(max_length=30, choices=(('application_comment', 'Application Comment'), ('shelter_comment', 'Shelter Comment'), ('application', 'Application'), ('status_update', "Status Update")))
  application = models.ForeignKey('applications.Application', on_delete=models.CASCADE, blank=True, null=True)
  comment = models.ForeignKey('comments.Comment', on_delete=models.CASCADE, blank=True, null=True)

  class Meta:
    ordering = ['-created_at']

