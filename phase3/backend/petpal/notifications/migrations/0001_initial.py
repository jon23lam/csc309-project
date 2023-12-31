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
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('body_text', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('read', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('type', models.CharField(choices=[('application_comment', 'Application Comment'), ('shelter_comment', 'Shelter Comment'), ('application', 'Application'), ('status_update', 'Status Update')], max_length=30)),
                ('associated_id', models.IntegerField()),
                ('application_id', models.IntegerField(blank=True, null=True)),
                ('shelter_id', models.IntegerField(blank=True, null=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
