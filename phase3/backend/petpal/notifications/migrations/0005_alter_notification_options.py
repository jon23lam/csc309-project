# Generated by Django 4.2.6 on 2023-12-09 20:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0004_alter_notification_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['read', '-created_at']},
        ),
    ]
