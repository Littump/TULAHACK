from api import models
from django_filters.rest_framework import CharFilter, FilterSet


class PostFilter(FilterSet):
    title = CharFilter(lookup_expr='icontains')

    class Meta:
        model = models.Post
        fields = ['title']