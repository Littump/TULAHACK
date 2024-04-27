from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from api import serializers, models, filters
from utils.logger import get_logger


class PostViewSet(ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.PostFilter


class LikeUserPostViewSet(ViewSet):
    queryset = models.LikeUserPost.objects.all()
    serializer_class = serializers.LikeUserPostSerializer


class CommentViewSet(ModelViewSet):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
