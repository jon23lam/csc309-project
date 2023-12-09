from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from .managers import UserManager
# Create your models here.

ROLE_SHELTER = "shelter"
ROLE_SEEKER = "seeker"
class PetHubUser(AbstractUser):
    username = None
    is_active = models.BooleanField(default=True)
    ROLES = ((ROLE_SEEKER, 'Seeker'), (ROLE_SHELTER, 'Shelter'))

    objects = UserManager()
    id = models.AutoField(primary_key=True, unique=True, editable=False)

    role = models.CharField(choices=ROLES, max_length=7)
    email = models.EmailField(unique=True)
    postal_code = models.CharField(max_length=6, blank=True)

    # Seeker fields
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    dob = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')), blank=True)
    image = models.ImageField(upload_to='images/', blank=True)

    # Shelter fields
    shelter_name = models.CharField(max_length=150, blank=True)
    street_address = models.CharField(max_length=150, blank=True)
    city = models.CharField(max_length=150, blank=True)
    province = models.CharField(max_length=150, blank=True)
    open_time = models.TimeField(blank=True, null=True)
    close_time = models.TimeField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    phone_number = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    animals_offered = models.TextField(blank=True)






    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']
