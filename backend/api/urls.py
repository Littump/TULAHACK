from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register('posts', views.PostViewSet, basename='posts')
v1_router.register('comments', views.CommentViewSet, basename='comments')
v1_router.register('users', views.CustomUserViewSet, basename='users')
v1_router.register('chats', views.ChatViewSet, basename='chats')
v1_router.register('messages', views.MessageViewSet, basename='messages')

urlpatterns = [
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
