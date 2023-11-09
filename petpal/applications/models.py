from django.db import models

# Create your models here.
STATUS_OPEN = "open"
STATUS_CLOSED = "closed"
class Application(models.Model):
    STATUSES = ((STATUS_OPEN, 'Open'), (STATUS_CLOSED, 'Closed'))

    status = models.CharField(choices=STATUSES, max_length=6)
    applicant = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE)
    pet_listing = models.ForeignKey('petlistings.PetListing', on_delete=models.CASCADE)

    REQUIRED_FIELDS = ['status']