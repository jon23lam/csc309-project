from django.db import models
from django.utils import timezone





class Application(models.Model):

    STATUS_TYPES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('withdrawn', 'Withdrawn'),
        ('NA', 'NA')
    )


    status = models.CharField(choices=STATUS_TYPES, max_length=10, default='pending')
    applicant = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE)
    pet_listing = models.ForeignKey('petlistings.PetListing', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True, unique=True, editable=False)


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
    shelter = models.ForeignKey('accounts.PetHubUser', related_name='applications_as_shelter', on_delete=models.CASCADE)
    occupation = models.CharField(max_length=150, blank=True)
    salary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    existing_pets = models.CharField(max_length=10, choices=EXISTING_PETS, default='0')
    home_yard = models.CharField(max_length=10, choices=YES_NO, default='no')
    safe_guard = models.CharField(max_length=10, choices=YES_NO, default='no')
    message = models.TextField(blank=True)
    REQUIRED_FIELDS = ['status']
