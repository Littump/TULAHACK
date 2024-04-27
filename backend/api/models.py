from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    address = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='users', blank=True)
    description = models.TextField(blank=True)
    time_work = models.CharField(max_length=255, blank=True)
    site = models.URLField(blank=True)

    context = models.TextField(blank=True)
    ai_using = models.BooleanField(default=False)

    KIND_CHOICES = (
        ('user', 'user'),
        ('company', 'company'),
    )

    kind = models.CharField(max_length=10, choices=KIND_CHOICES, default='user')


class Post(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    address = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    image = models.ImageField(upload_to='posts', blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    class Meta:
        ordering = ['-created']


class LikeUserPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']


class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_user', blank=True)
    company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_company')


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages', blank=True)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']
