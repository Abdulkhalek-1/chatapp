from django.urls import path, include
from . import consumers

websocket_urlpatterns = [
  path('ws/<str:receiver_id>/', consumers.ChatMessageConsumer.as_asgi()),
]