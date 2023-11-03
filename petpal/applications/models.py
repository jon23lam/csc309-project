from django.db import models
from django.utils import timezone




# Create your models here.
class Application(models.Model):
    applicant = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE)
    # pet_listing = models.ForeignKey('petlistings.PetListing', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True, unique=True, editable=False)
    STATUS_TYPES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
    )

    EXISTING_PETS = (
        ('0', '0'),
        ('1', '1'),
        ('2', '2'),
        ('3+', '3 or more'),
    )

    YES_NO = (
        ('yes', 'Yes'),
        ('no', 'No'),
    )

    shelter_name = models.CharField(max_length=150, blank=True)
    occupation = models.CharField(max_length=150, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_TYPES, default='pending')
    salary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    existing_pets = models.CharField(max_length=10, choices=EXISTING_PETS, default='0')
    home_yard = models.CharField(max_length=10, choices=YES_NO, default='no')
    safe_guard = models.CharField(max_length=10, choices=YES_NO, default='no')
    message = models.TextField(blank=True)

