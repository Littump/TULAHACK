from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register('posts', views.PostViewSet, basename='posts')
v1_router.register('likes', views.LikeUserPostViewSet, basename='likes')
v1_router.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = [
    path('', include('djoser.urls')),
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
]
