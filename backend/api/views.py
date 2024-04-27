from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from api import serializers, models, filters
from utils.logger import get_logger
from djoser.views import UserViewSet

class PostViewSet(ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.PostFilter

    @action(methods=['post'], detail=True)
    def exchange_likes(self, request, pk):
        post = self.get_object()
        user = request.user
        if models.LikeUserPost.objects.filter(user=user, post=post).exists():
            models.LikeUserPost.objects.filter(user=user, post=post).delete()
        else:
            models.LikeUserPost.objects.create(user=user, post=post)
        serializer = serializers.PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentViewSet(ModelViewSet):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer


class CustomUserViewSet(UserViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.UserFilter
