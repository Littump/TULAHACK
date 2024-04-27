from rest_framework import serializers
from djoser.serializers import UserSerializer
from api import models
from rest_framework.fields import SerializerMethodField
from clients import Clients


class UserCustomSerializer(UserSerializer):
    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'name',
            'phone',
            'address',
            'description',
            'photo',
        )


class PostSerializer(serializers.ModelSerializer):
    user = SerializerMethodField()
    likes = SerializerMethodField()
    clients = Clients()

    class Meta:
        model = models.Post
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['address'] = self.clients.dadata.get_adress(validated_data['latitude'], validated_data['longitude'])
        return models.Post.objects.create(**validated_data)

    def validate(self, data):
        # TODO: check on spam
        return data

    def get_user(self, obj):
        return obj.user.name

    def get_likes(self, obj):
        return obj.likes.count()


class LikeUserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LikeUserPost
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.LikeUserPost.objects.create(**validated_data)


class CommentSerializer(serializers.ModelSerializer):
    user = SerializerMethodField()
    user_image = SerializerMethodField()

    class Meta:
        model = models.Comment
        fields = '__all__'
        ordering = ['created']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return models.Comment.objects.create(**validated_data)

    def get_user(self, obj):
        return obj.user.name

    def get_user_image(self, obj):
        return obj.user.photo
