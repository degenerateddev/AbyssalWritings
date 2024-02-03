#!/bin/bash

# echo "Flush the manage.py command it any"

# while ! python manage.py flush --no-input 2>&1; do  # Obviously needs to be removed for production lol
#  echo "Flushing django manage command"
#  sleep 3
# done

echo "Migrate the Database at startup of project"

while ! python manage.py makemigrations 2>&1; do
    echo "Creating migrations..."
    sleep 3
done

while ! python manage.py migrate 2>&1; do
    echo "Migration is in progress status"
    sleep 3
done

while ! echo "yes" | python manage.py collectstatic 2>&1 | grep -q "This will overwrite existing files!"; do
    echo "Collecting static files"
    sleep 3
done

echo "Django docker is fully configured successfully."

exec "$@"