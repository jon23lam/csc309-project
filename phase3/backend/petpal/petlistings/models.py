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
BREED_PERSIAN = "persian"
BREED_SHORTHAIR = "shorthair"
BREED_SPHYNX = "sphynx"
BREED_PARAKEET = "parakeet"
BREED_CHICKEN = "chicken"
BREED_BASS = "bass"
BREED_GOLDFISH = "goldfish"

OTHER_TYPE = "other"

STATUS_AVAILABLE = "available"
STATUS_ADOPTED = "adopted"
STATUS_PENDING = "pending"
STATUS_WITHDRAWN = "withdrawn"
# Create your models here.


class PetListing(models.Model):
    lister = models.ForeignKey(
        'accounts.PetHubUser', on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=200, null=False)
    animal = models.CharField(max_length=20, choices=((ANIMAL_DOG, 'Dog'), (ANIMAL_CAT, 'Cat'), (ANIMAL_BIRD, 'Bird'),
                                                      (ANIMAL_FISH, 'Fish'), (OTHER_TYPE, "Other")), null=False)
    breed = models.CharField(max_length=20, choices=((BREED_CORGI, 'Corgi'), (BREED_LABRADOR, 'Labrador'),
                                                     (BREED_RETRIEVER, 'Retriever'), (
                                                         BREED_GERMAN_SHEPHERD, 'German Shepherd'), (BREED_PUSSYCAT, 'Pussycat'),
                                                     (BREED_PERSIAN, "Persian"), (BREED_SHORTHAIR,
                                                                                  "Shorthair"), (BREED_SPHYNX, "Sphynx"),
                                                     (BREED_PARAKEET, "Parakeet"), (BREED_CHICKEN,
                                                                                    "Chicken"),  (BREED_BASS, "Bass"),
                                                     (BREED_GOLDFISH,
                                                      "Goldfish"), (OTHER_TYPE, "Other")
                                                     ),
                             null=False)
    sex = models.CharField(max_length=1, choices=(
        ('M', 'Male'), ('F', 'Female')), null=False)

    colour = models.CharField(max_length=20, choices=(('white', 'White'), ('black', 'Black'), ('brown', 'Brown'),
                                                      ('sable', 'Sable')), null=False)
    age = models.IntegerField(blank=False, null=False,)
    weight = models.IntegerField(blank=False, null=False,)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='listing_images/')
    status = models.CharField(max_length=20, choices=((STATUS_AVAILABLE, 'Available'), (STATUS_ADOPTED, 'Adopted'),
                                                      (STATUS_PENDING, 'Pending'), (STATUS_WITHDRAWN, 'Withdrawn')), null=False)
    created_at = models.DateTimeField(auto_now_add=True)
