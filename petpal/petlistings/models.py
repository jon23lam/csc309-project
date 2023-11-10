from django.db import models


# Create your models here.
class PetListing(models.Model):
    lister = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=200, null=False)
    animal = models.CharField(max_length=20, choices=(('Dog', 'Dog'), ('Cat', 'Cat'), ('Bird', 'Bird'),
                                                     ('Fish', 'Fish')), null=False)
    breed = models.CharField(max_length=20, choices=(('Corgi', 'Corgi'), ('Labrador', 'Labrador'),
                                                    ('Retriever', 'Retriever'), ('German Shepherd', 'German Shepherd')),
                             null=False)
    sex = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')))
    province = models.CharField(max_length=2,
                                choices=(('ON', 'Ontario'), ('BC', 'British Columbia'), ('AB', 'Alberta'),
                                         ('SK', 'Saskatchewan'), ('MB', 'Manitoba'), ('QB', 'Quebec'),
                                         ('NS', 'Nova Scotia'), ('NB', 'New Brunswick'), ('PE', 'Prince Edward Island'),
                                         ('NT', 'Northwest Territories'), ('YK', 'Yukon'), ('NV', 'Nunavut'),
                                         ('NL', 'Newfoundland and Labrador')), null=False)
    address = models.CharField(max_length=200)
    colour = models.CharField(max_length=20, choices=(('White', 'White'), ('Black', 'Black'), ('Brown', 'Brown'),
                                                     ('Sable', 'Sable')), null=False)
    age = models.IntegerField(blank=False, null=False)
    weight = models.IntegerField(blank=False, null=False)
    description = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='images/')
    status = models.CharField(max_length=20, choices=(('Available', 'Available'), ('Adopted', 'Adopted'),
                                                     ('Pending', 'Pending'), ('Withdrawn', 'Withdrawn')), null=False)
