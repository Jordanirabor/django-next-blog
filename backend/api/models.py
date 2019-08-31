
# api/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from cloudinary.models import CloudinaryField  # add this


class User(AbstractUser):
    def __str__(self):
        return self.username


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(
        'Post', related_name='comments',
        on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.author.username + "'s comment"


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    header_image = CloudinaryField(
        'image', blank=True, null=True)       # add this
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
