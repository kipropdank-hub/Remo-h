import os

from django.contrib.auth.hashers import check_password, make_password
from django.db import migrations


def ensure_admin_user(apps, schema_editor):
    """Create (or repair) the demo superuser whenever migrations are applied.

    Defaults to admin / admin. Override with DJANGO_SUPERUSER_USERNAME,
    DJANGO_SUPERUSER_PASSWORD and DJANGO_SUPERUSER_EMAIL if needed.
    """
    User = apps.get_model('auth', 'User')
    username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
    password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin')
    email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@remohospital.com')

    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            'email': email,
            'password': make_password(password),
            'is_staff': True,
            'is_superuser': True,
            'is_active': True,
        },
    )

    if created:
        return

    changed_fields = []
    if not user.is_staff:
        user.is_staff = True
        changed_fields.append('is_staff')
    if not user.is_superuser:
        user.is_superuser = True
        changed_fields.append('is_superuser')
    if not user.is_active:
        user.is_active = True
        changed_fields.append('is_active')
    if not check_password(password, user.password):
        user.password = make_password(password)
        changed_fields.append('password')

    if changed_fields:
        user.save(update_fields=changed_fields)


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(ensure_admin_user, migrations.RunPython.noop),
    ]
