from django.db import models

ANIMAL_DOG = "dog"
ANIMAL_CAT = "cat"
ANIMAL_BIRD = "bird"
ANIMAL_FISH = "fish"

BREED_CORGI = "corgi"
BREED_LABRADOR = "labrador"
BREED_RETRIEVER = "retriever"
BREED_GERMAN_SHEPHERD = "german shepherd"
BREED_PUSSYCAT = "pussycat"

STATUS_AVAILABLE = "available"
STATUS_ADOPTED = "adopted"
STATUS_PENDING = "pending"
STATUS_WITHDRAWN = "withdrawn"
# Create your models here.
class PetListing(models.Model):
    lister = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=200, null=False)
    animal = models.CharField(max_length=20, choices=((ANIMAL_DOG, 'Dog'), (ANIMAL_CAT, 'Cat'), (ANIMAL_BIRD, 'Bird'),
                                                     (ANIMAL_FISH, 'Fish')), null=False)
    breed = models.CharField(max_length=20, choices=((BREED_CORGI, 'Corgi'), (BREED_LABRADOR, 'Labrador'),
                                                    (BREED_RETRIEVER, 'Retriever'), (BREED_GERMAN_SHEPHERD, 'German Shepherd'), (BREED_PUSSYCAT, 'Pussycat'),),
                             null=False)
    sex = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')), null=False)
    province = models.CharField(max_length=2,
                                choices=(('ON', 'Ontario'), ('BC', 'British Columbia'), ('AB', 'Alberta'),
                                         ('SK', 'Saskatchewan'), ('MB', 'Manitoba'), ('QB', 'Quebec'),
                                         ('NS', 'Nova Scotia'), ('NB', 'New Brunswick'), ('PE', 'Prince Edward Island'),
                                         ('NT', 'Northwest Territories'), ('YK', 'Yukon'), ('NV', 'Nunavut'),
                                         ('NL', 'Newfoundland and Labrador')))
    address = models.CharField(max_length=200)
    colour = models.CharField(max_length=20, choices=(('White', 'White'), ('Black', 'Black'), ('Brown', 'Brown'),
                                                     ('Sable', 'Sable')), null=False)
    age = models.IntegerField(blank=False, null=False,)
    weight = models.IntegerField(blank=False, null=False,)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='listing_images/')
    status = models.CharField(max_length=20, choices=((STATUS_AVAILABLE, 'Available'), (STATUS_ADOPTED, 'Adopted'),
                                                     (STATUS_PENDING, 'Pending'), (STATUS_WITHDRAWN, 'Withdrawn')), null=False)
