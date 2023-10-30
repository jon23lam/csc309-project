from django.db import models

# Create your models here.
class Application(models.Model):
    applicant = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE)
    pet_listing = models.ForeignKey('petlistings.PetListing', on_delete=models.CASCADE)