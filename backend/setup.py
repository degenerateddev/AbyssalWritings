from api.models import Genre

# Genres
thriller, created = Genre.objects.get_or_create(name="Thriller", description="Aufregende Geschichten über die Gefahren und Geheimnisse unseres Nächsten.")
crimi, created = Genre.objects.get_or_create(name="Krimi", description="Let's get the party going!")
horror, created = Genre.objects.get_or_create(name="Horror", description="Grußelige Geschichten, die einem das Blut in den Adern gefrieren lassen")