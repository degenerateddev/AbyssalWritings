from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
import uuid

# Create your models here.
class Story(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    title = models.CharField(max_length=50)
    content = models.TextField()
    image = models.ImageField(upload_to="images/", null=True)
    date = models.DateField(default=timezone.datetime.now().date())
    hearts = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(get_user_model(), blank=True)
    genre = models.ForeignKey("Genre", on_delete=models.SET_NULL, null=True)
    active = models.BooleanField(default=True)

class StoryLine(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    title = models.CharField(max_length=50)
    description = models.TextField()
    stories = models.ManyToManyField("Story", blank=True)
    active = models.BooleanField(default=True)

class Genre(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    name = models.CharField(max_length=50)
    description = models.TextField()
    banner = models.ImageField(upload_to="banner/", null=True)