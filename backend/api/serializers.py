from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Story, StoryLine, Genre
from .utils import get_user

class GenreSerializer(ModelSerializer):
    uuid = serializers.CharField()
    name = serializers.CharField()
    description = serializers.CharField()
    banner = serializers.ImageField()

    class Meta:
        model = Genre
        fields = ("uuid", "name", "description", "banner")
    
class StoryUploadSerializer(ModelSerializer):
    title = serializers.CharField()
    content = serializers.CharField()
    image = serializers.ImageField(required=False)
    genre = serializers.CharField(required=False)

    class Meta:
        model = Story
        fields = ("title", "content", "image", "genre")
    
    def validate(self, unvalidated_data):
        print("Add Test")
        return unvalidated_data
    
    def create(self, validated_data):
        title = validated_data.get("title")
        content = validated_data.get("content")

        date = validated_data.get("date")
        hearts = validated_data.get("hearts")
        genre = validated_data.get("genre")

        story = Story.objects.create(title=title, content=content)

        if date != None:
            story.date = date
            story.save()
        
        if hearts != None:
            story.hearts = hearts
            story.save()

        if genre != None:
            genre = Genre.objects.filter(uuid=genre)
            if genre.exists():
                story.genre = genre.first()
                story.save()

        return story

class StorySerializer(ModelSerializer):
    title = serializers.CharField()
    content = serializers.CharField()
    date = serializers.DateField()
    hearts = serializers.IntegerField()
    liked = serializers.SerializerMethodField()
    image = serializers.ImageField()
    genre = GenreSerializer()

    class Meta:
        model = Story
        fields = ("__all__")
        depth = 2
    
    def get_liked(self, obj):
        request = self.context.get("request")
        if request != None:
            user = get_user(request)

            if user != None:
                if user in obj.liked_by.all():
                    return True

        return False

class StoryLineSerializer(ModelSerializer):
    uuid = serializers.UUIDField()
    title = serializers.CharField()
    description = serializers.CharField()

    stories = serializers.SerializerMethodField()
    
    class Meta:
        model = StoryLine
        fields = ("__all__")
    
    def get_stories(self, obj):
        stories = obj.stories.all().order_by("date")
        serialized = StorySerializer(stories, many=True)

        return serialized.data
    
    def validate(self, unvalidated_data):
        return unvalidated_data
    
    def create(self, validated_data):
        title = validated_data.get("title")
        description = validated_data.get("description")

        storyline = StoryLine.objects.create(title=title, description=description)

        return storyline