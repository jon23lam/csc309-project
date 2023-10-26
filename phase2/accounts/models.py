from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class PetHubUser(AbstractUser):
    username = None
    ROLES = (('seeker', 'Seeker'), ('shelter', 'Shelter'))

    role = models.CharField(choices=ROLES, max_length=7)
    email = models.EmailField(primary_key=True, unique=True)

    # Seeker fields
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    dob = models.DateField(auto_now=True)
    gender = models.CharField(max_length=1)
    postal_code = models.CharField(max_length=6)
    images = models.ImageField(upload_to='images/', blank=True)

    # Shelter fields
    shelter_name = models.CharField(max_length=150)
    street_address = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    province = models.CharField(max_length=150)
    postal_code = models.CharField(max_length=6)
    open_time = models.TimeField(auto_now=True)
    close_time = models.TimeField(auto_now=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    def update(self, data):
        for key, value in data.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.save()
        return self
