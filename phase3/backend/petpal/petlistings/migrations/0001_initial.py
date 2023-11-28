# Generated by Django 4.2.6 on 2023-11-21 21:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PetListing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('animal', models.CharField(choices=[('dog', 'Dog'), ('cat', 'Cat'), ('bird', 'Bird'), ('fish', 'Fish')], max_length=20)),
                ('breed', models.CharField(choices=[('corgi', 'Corgi'), ('labrador', 'Labrador'), ('retriever', 'Retriever'), ('german shepherd', 'German Shepherd'), ('pussycat', 'Pussycat')], max_length=20)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('province', models.CharField(choices=[('ON', 'Ontario'), ('BC', 'British Columbia'), ('AB', 'Alberta'), ('SK', 'Saskatchewan'), ('MB', 'Manitoba'), ('QB', 'Quebec'), ('NS', 'Nova Scotia'), ('NB', 'New Brunswick'), ('PE', 'Prince Edward Island'), ('NT', 'Northwest Territories'), ('YK', 'Yukon'), ('NV', 'Nunavut'), ('NL', 'Newfoundland and Labrador')], max_length=2)),
                ('address', models.CharField(max_length=200)),
                ('colour', models.CharField(choices=[('White', 'White'), ('Black', 'Black'), ('Brown', 'Brown'), ('Sable', 'Sable')], max_length=20)),
                ('age', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('description', models.CharField(max_length=1000)),
                ('image', models.ImageField(upload_to='listing_images/')),
                ('status', models.CharField(choices=[('available', 'Available'), ('adopted', 'Adopted'), ('pending', 'Pending'), ('withdrawn', 'Withdrawn')], max_length=20)),
                ('lister', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]