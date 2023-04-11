#!/bin/bash

echo "Flush the manage.py command it any"

while ! python manage.py flush --no-input 2>&1; do  # Obviously needs to be removed for production lol
 echo "Flusing django manage command"
 sleep 3
done

echo "Migrate the Database at startup of project"

while ! python manage.py makemigrations 2>&1; do
    echo "Creating migrations..."
    sleep 3
done

while ! python manage.py migrate 2>&1; do
    echo "Migration is in progress status"
    sleep 3
done

cat <<EOF | python manage.py shell
exec(open('setup.py').read())
EOF

echo "Django docker is fully configured successfully."

exec "$@"