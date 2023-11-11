# Generated by Django 4.2.6 on 2023-11-11 00:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='application',
            name='existing_pets',
            field=models.CharField(choices=[('0', '0'), ('1', '1'), ('2', '2'), ('3+', '3 or more')], default='0', max_length=10),
        ),
        migrations.AddField(
            model_name='application',
            name='home_yard',
            field=models.CharField(choices=[('yes', 'Yes'), ('no', 'No')], default='no', max_length=10),
        ),
        migrations.AddField(
            model_name='application',
            name='last_updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='application',
            name='message',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='application',
            name='occupation',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='application',
            name='safe_guard',
            field=models.CharField(choices=[('yes', 'Yes'), ('no', 'No')], default='no', max_length=10),
        ),
        migrations.AddField(
            model_name='application',
            name='salary',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='application',
            name='shelter_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied')], default='pending', max_length=10),
        ),
        migrations.AlterField(
            model_name='application',
            name='id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False, unique=True),
        ),
    ]
