from django.db import models

# Create your models here.
class SeekerUser(models.AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    dob = models.DateField()
    gender = models.CharField(max_length=1)
    postal_code = models.CharField(max_length=6, min_length=6)
    images = models.ImageField(upload_to='images/', blank=True)


    USERNAME_FIELD = 'email'

class ShelterUser(models.AbstractUser):
    username = None
    first_name = None
    last_name = None

    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    street_address = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    province = models.CharField(max_length=150)
    postal_code = models.CharField(max_length=6, min_length=6)
    open_time = models.TimeField()
    close_time = models.TimeField()

    USERNAME_FIELD = 'email'