
# api/serializers.py

from rest_framework import serializers
from .models import Post, Comment, User
from django.conf import settings


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'content')


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True, read_only=True)
    header_image = serializers.ImageField()  # add this

    class Meta:
        model = Post
        fields = ('id', 'title', 'header_image', 'content', 'author',
                  'comments', 'created', 'updated')
