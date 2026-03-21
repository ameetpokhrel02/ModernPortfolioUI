#!/bin/sh
set -e

python manage.py migrate --noinput
python manage.py collectstatic --noinput

# (Optional) create superuser if needed
# echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'admin123') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell

exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application