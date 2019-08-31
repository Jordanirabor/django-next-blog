
# api/urls.py

from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('posts', views.PostsViewSet, base_name='post')
router.register('comments', views.CommentsViewSet, base_name='comment')

urlpatterns = [
    path('auth/', include('djoser.urls')),   # add this
    path('auth/', include('djoser.urls.jwt')),   # add this
    path('', include(router.urls)),
]