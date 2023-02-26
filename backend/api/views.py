from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import Response, APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

import random

from .serializers import StorySerializer, StoryLineSerializer, GenreSerializer, StoryUploadSerializer, RegisterSerializer
from .models import Story, StoryLine, Genre
from .utils import get_user

class TokenRegister(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })

@api_view(["GET"])
def index(request):
    newest = Story.objects.filter(active=True).order_by("-date")[:3]
    fav = Genre.objects.all() # Should be Horror, Thriller

    serialized_newest = StorySerializer(newest, many=True)
    serialized_fav = GenreSerializer(fav, many=True)

    return Response({
        "newest": serialized_newest.data,
        "fav": serialized_fav.data
    })

@api_view(["GET"])
def showcase(request):
    story = random.choice(Story.objects.filter(active=True))

    serialized = StorySerializer(story)
    return Response(serialized.data)

@api_view(["GET"])
def stories(request):
    stories = Story.objects.filter(active=True)
    serialized = StorySerializer(stories, many=True)

    return Response(serialized.data)

@api_view(["GET"])
def genres(request):
    genres = Genre.objects.all()
    serialized = GenreSerializer(genres, many=True)

    return Response(serialized.data)

@api_view(["GET"])
def genre(request, genre):
    genre = Genre.objects.filter(name=genre)

    if genre.exists():
        serialized = GenreSerializer(genre.first())

        stories = Story.objects.filter(genre=genre.first(), active=True)
        serialized_stories = StorySerializer(stories, many=True)

        return Response({
            "genre": serialized.data,
            "stories": serialized_stories.data
        })

@api_view(["GET"])
def story(request, uuid):
    story = Story.objects.filter(uuid=uuid)

    if story.exists():
        serialized = StorySerializer(story.first(), context={'request': request})
        return Response(serialized.data)

@api_view(["GET"])
def storyline(request, uuid):
    storyline = StoryLine.objects.filter(uuid=uuid)
    
    if storyline.exists():
        serialized = StoryLineSerializer(storyline.first())
        return Response(serialized.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def like(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)
    user = get_user(request)

    if story.exists() and user != None and user not in story.first().liked_by.all():
        story = story.first()
        story.hearts += 1
        story.liked_by.add(user)
        story.save()

        return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def unlike(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)
    user = get_user(request)

    if story.exists() and user != None and user in story.first().liked_by.all():
        story = story.first()
        story.hearts -= 1
        story.liked_by.remove(user)
        story.save()

        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
### ADMIN ###
@api_view(["GET"])
@permission_classes([IsAdminUser])
def story_overview(request):
    stories = Story.objects.all()
    serialized_stories = StorySerializer(stories, many=True)

    storylines = StoryLine.objects.all()
    serialized_storylines = StoryLineSerializer(storylines, many=True)

    return Response({
        "stories": serialized_stories.data,
        "storylines": serialized_storylines.data
    })

### Stories ###

@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_storyline(request, uuid):   # Takes story UUID and gets storyline
    story = Story.objects.filter(uuid=uuid)
    if story.exists():
        story = story.first()
        storyline = StoryLine.objects.filter(stories__in=[story])

        if storyline.exists():
            serializer = StoryLineSerializer(storyline.first())

            return Response(serializer.data)
    
    return Response({
        "error": "Could not find corresponding storyline!"
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_available_storylines(request):
    storylines = StoryLine.objects.all()
    serialized = StoryLineSerializer(storylines, many=True)

    return Response(serialized.data)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_story(request):
    print(request.data)
    serializer = StoryUploadSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        story = serializer.save()
        
        serialized = StorySerializer(story)
        return Response(serialized.data)
    
    print(serializer.errors)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def add_image(request):
    uuid = request.data.get("uuid")

    story = Story.objects.filter(uuid=uuid)
    if story.exists():
        story = story.first()
        img = request.data.get("image")
        story.image = img
        story.save()
        
        serialized = StorySerializer(story)
        return Response(serialized.data)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def rmv_story(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)
    
    if story.exists():
        story.first().delete()

        return Response(status=200)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def edit_story(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)
    if story.exists():
        story = story.first()
        title = request.data.get("title")
        content = request.data.get("content")
        
        if title != None:
            story.title = title
            story.save()
        
        if content != None:
            story.content = content
            story.save()

        serialized = StorySerializer(story)
        return Response(serialized.data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def toggle_story(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)

    if story.exists():
        story = story.first()
        story.active = not story.active
        story.save()

        return Response(status=status.HTTP_200_OK)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def add_to_genre(request):
    uuid = request.data.get("uuid")
    story = Story.objects.filter(uuid=uuid)

    if story.exists():
        story = story.first()
        uuid = request.data.get("genre")
        genre = Genre.objects.filter(uuid=uuid)
        if genre.exists():
            genre = genre.first()
            story.genre = genre
            story.save()

            return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

### Storylines ###

@api_view(["POST"])
@permission_classes([IsAdminUser])
def add_storyline(request):
    serializer = StoryLineSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        storyline = serializer.save()

        serialized = StoryLineSerializer(storyline)
        return Response(serialized.data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def add_to_storyline(request):
    sl = request.data.get("storyline")
    s = request.data.get("story")
    
    storyline = StoryLine.objects.filter(uuid=sl)
    if storyline.exists():
        story = Story.objects.filter(uuid=s)
        if story.exists():
            storyline.first().stories.add(story.first())

            return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def rmv_storyline(request):
    uuid = request.data.get("uuid")
    storyline = StoryLine.objects.filter(uuid=uuid)
    
    if storyline.exists():
        storyline = storyline.first()
        for story in storyline.stories.all():
            story.delete()
        
        storyline.delete()
        
        return Response(status=200)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def rmv_from_storyline(request):
    storyline_uuid = request.data.get("storyline_uuid")
    storyline = StoryLine.objects.filter(uuid=storyline_uuid)
    
    if storyline.exists():
        storyline = storyline.first()

        story_uuid = request.data.get("story_uuid")
        story = Story.objects.filter(uuid=story_uuid)
        if story.exists():
            story = story.first()
            if story in storyline.stories.all():
                storyline.stories.remove(story)
        
                return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

### Guards ###

@api_view(["GET"])
@permission_classes([IsAdminUser])
def is_admin(request):
    return Response(status=200)