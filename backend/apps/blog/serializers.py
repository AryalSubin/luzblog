from rest_framework import serializers
from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list endpoints."""

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'status', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    """Full serializer for detail/create/update endpoints."""

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'excerpt', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
