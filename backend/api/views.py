from api import filters, models, serializers
from clients import Clients
from django_filters.rest_framework import DjangoFilterBackend
from djoser.views import UserViewSet
from drf_yasg.utils import swagger_auto_schema
from project import config
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet


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
        serializer = serializers.PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentViewSet(ModelViewSet):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer


class CustomUserViewSet(UserViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.UserFilter

    def get_queryset(self):
        if self.action == "list":
            return models.User.objects.all()
        queryset = super().get_queryset()
        return queryset


class ChatViewSet(ModelViewSet):
    queryset = models.Chat.objects.all()
    serializer_class = serializers.ChatSerializer

    @action(methods=['get'], detail=False)
    def me(self, request):
        user = request.user
        chats_user = user.chats_user.all()
        chats_company = user.chats_company.all()
        chats = chats_user | chats_company
        serializer = serializers.ChatSerializer(chats, many=True, context={'request': request})
        return Response(serializer.data)


class MessageViewSet(ModelViewSet):
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer


class QAViewSet(ViewSet):
    clients = Clients()

    @swagger_auto_schema(
        request_body=serializers.QAQustionSerializer,
        responses={200: serializers.QAQustionSerializer}
    )
    @action(methods=['post'], detail=False)
    def qa(self, request):
        serializer = serializers.QAQustionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text = serializer.validated_data['text']
        prompt = config.PROMPT
        answer = self.clients.yandex.gpt(prompt, text)
        serializer = serializers.QAQustionSerializer(data={'text': answer})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=200)
