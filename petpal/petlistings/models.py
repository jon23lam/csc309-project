from django.db import models


# Create your models here.
class PetListing(models.Model):
    lister = models.ForeignKey('accounts.PetHubUser', on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=200, null=False, default="None")
    animal = models.CharField(max_length=20, choices=(('Dog', 'Dog'), ('Cat', 'Cat'), ('Bird', 'Bird'),
                                                     ('Fish', 'Fish')), null=False, default='None')
    breed = models.CharField(max_length=20, choices=(('Corgi', 'Corgi'), ('Labrador', 'Labrador'),
                                                    ('Retriever', 'Retriever'), ('German Shepherd', 'German Shepherd')),
                             null=False, default="None")
    sex = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female')), null=False, default='M')
    province = models.CharField(max_length=2,
                                choices=(('ON', 'Ontario'), ('BC', 'British Columbia'), ('AB', 'Alberta'),
                                         ('SK', 'Saskatchewan'), ('MB', 'Manitoba'), ('QB', 'Quebec'),
                                         ('NS', 'Nova Scotia'), ('NB', 'New Brunswick'), ('PE', 'Prince Edward Island'),
                                         ('NT', 'Northwest Territories'), ('YK', 'Yukon'), ('NV', 'Nunavut'),
                                         ('NL', 'Newfoundland and Labrador')), null=False, default='ON')
    address = models.CharField(max_length=200, default="123 Fake Street")
    colour = models.CharField(max_length=20, choices=(('White', 'White'), ('Black', 'Black'), ('Brown', 'Brown'),
                                                     ('Sable', 'Sable')), null=False, default='Black')
    age = models.IntegerField(blank=False, null=False, default=0)
    weight = models.IntegerField(blank=False, null=False, default=0)
    description = models.CharField(max_length=1000, blank=False, null=False, default="None")
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=(('Available', 'Available'), ('Adopted', 'Adopted'),
                                                     ('Pending', 'Pending'), ('Withdrawn', 'Withdrawn')), null=False, default='Available')
