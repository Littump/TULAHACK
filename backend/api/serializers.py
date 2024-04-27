from rest_framework import serializers
from djoser.serializers import UserSerializer
from api import models
from rest_framework.fields import SerializerMethodField


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

    class Meta:
        model = models.Post
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        
        return models.Post.objects.create(**validated_data)

    def validate(self, data):
        # TODO: check on spam
        return data

    def get_user(self, obj):
        return obj.user.name

    