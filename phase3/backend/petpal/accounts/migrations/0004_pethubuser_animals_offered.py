# Generated by Django 4.2.6 on 2023-12-09 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_pethubuser_description_pethubuser_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='pethubuser',
            name='animals_offered',
            field=models.TextField(blank=True),
        ),
    ]
