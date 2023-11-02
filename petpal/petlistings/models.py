from django.db import models

# Create your models here.
class PetListing(models.Model):
    lister = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE)