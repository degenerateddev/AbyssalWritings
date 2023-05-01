from api.models import Genre
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

user, created = get_user_model().objects.get_or_create(is_superuser=True, is_staff=True, username="Tim", email="frenggie@gmx.de", password=make_password("Tim1337#"))

# Genres
thriller, created = Genre.objects.get_or_create(name="Thriller", description="Aufregende Geschichten über die Gefahren und Geheimnisse unseres Nächsten.")
crimi, created = Genre.objects.get_or_create(name="Krimi", description="Let's get the party going!")
horror, created = Genre.objects.get_or_create(name="Horror", description="Grußelige Geschichten, die einem das Blut in den Adern gefrieren lassen.")
science_fiction, created = Genre.objects.get_or_create(name="Science Fiction", description="Futuristische Stories über zukünftig zu tragende Laster, die Unendlichkeit und das Unbekannte.")
