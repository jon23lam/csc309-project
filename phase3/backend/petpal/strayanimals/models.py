from django.db import models

from petlistings.models import ANIMAL_BIRD, ANIMAL_CAT, ANIMAL_DOG, ANIMAL_FISH, BREED_CORGI, BREED_GERMAN_SHEPHERD, BREED_LABRADOR, BREED_PUSSYCAT, BREED_RETRIEVER, BREED_SHORTHAIR, BREED_PERSIAN, BREED_SPHYNX, BREED_CHICKEN, BREED_PARAKEET

ANIMAL_UNKNOWN = "unknown"

BREED_UNKNOWN = "unknown"

STATUS_LOST = "lost"
STATUS_SPOTTED = "spotted"
STATUS_RESCUED = "rescued"


class StrayAnimal(models.Model):
    reporter = models.ForeignKey(
        'accounts.PetHubUser', on_delete=models.CASCADE, default=None)
    address = models.CharField(max_length=200, null=False)
    lat = models.FloatField(null=False)
    lng = models.FloatField(null=False)
    status = models.CharField(max_length=20, choices=(
        (STATUS_LOST, 'Lost'), (STATUS_SPOTTED, 'Spotted'), (STATUS_RESCUED, 'Rescued')), null=False)
    animal = models.CharField(max_length=20, choices=((ANIMAL_DOG, 'Dog'), (ANIMAL_CAT, 'Cat'), (ANIMAL_BIRD, 'Bird'),
                                                        (ANIMAL_UNKNOWN, 'Unknown')), null=False)
    breed = models.CharField(max_length=20, choices=((BREED_CORGI, 'Corgi'), (BREED_LABRADOR, 'Labrador'),
                                                     (BREED_RETRIEVER, 'Retriever'), (BREED_GERMAN_SHEPHERD, 'German Shepherd'), (BREED_PUSSYCAT, 'Pussycat'), (BREED_UNKNOWN, 'Unknown'),
                                                     (BREED_PERSIAN, "Persian"), (BREED_SHORTHAIR,
                                                                                  "Shorthair"), (BREED_SPHYNX, "Sphynx"),
                                                     (BREED_PARAKEET, "Parakeet"), (BREED_CHICKEN,
                                                                                    "Chicken")),
                             null=False)
    description = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
