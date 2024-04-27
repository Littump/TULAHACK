from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='users', blank=True)
    description = models.TextField(blank=True)


class Post(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    address = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    image = models.ImageField(upload_to='posts', blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()


class LikeUserPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
