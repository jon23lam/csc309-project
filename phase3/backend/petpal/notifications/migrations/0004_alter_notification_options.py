# Generated by Django 4.2.6 on 2023-12-09 20:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_notification_associated_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['-read', '-created_at']},
        ),
    ]
