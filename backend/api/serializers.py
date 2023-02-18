from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from .models import Story, StoryLine, Genre

class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ("__all__")

class StorySerializer(ModelSerializer):
    title = serializers.CharField()
    content = serializers.CharField()
    date = serializers.DateField(required=False)
    hearts = serializers.IntegerField(required=False)
    image = serializers.ImageField(required=False)
    genre = GenreSerializer(required=False)

    class Meta:
        model = Story
        fields = ("__all__")
        depth = 2

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
                story.genre = genre
                story.save()

        return story

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