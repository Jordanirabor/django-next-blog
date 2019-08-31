
# api/views.py

from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly  # add this
from .permissions import IsOwnerOrReadOnly  # add this


class PostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsOwnerOrReadOnly, )    # add this

    def perform_create(self, serializer):
        """ sets author of post to logged in user """
        serializer.save(author=self.request.user)


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    http_method_names = ['get', 'post', 'head']
    permission_classes = (IsAuthenticatedOrReadOnly , )       # add this

    def perform_create(self, serializer):
        """ sets author of comment to logged in user """
        serializer.save(author=self.request.user)
