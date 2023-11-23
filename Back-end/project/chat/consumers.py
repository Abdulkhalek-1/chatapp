import json, time
from . import models
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from accounts.models import UserProfile
from .models import ChatChannel


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_anonymous:
            await self.close()
        else:
            await self.accept()
            await self.add_user_to_channels(user)

    def get_user_profile(self, user):
        return UserProfile.objects.get(user=user)

    def get_channels(self, user_profile):
        return ChatChannel.objects.filter(members=user_profile)

    async def add_user_to_channels(self, user):
        user_profile = await database_sync_to_async(self.get_user_profile)(user)
        channels = await database_sync_to_async(self.get_channels)(user_profile)

        async for channel in channels:
            print(channel.id)
            await self.channel_layer.group_add(f"group_{channel.id}", self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        print(text_data)
        print([q for q in self.scope["user"]])
        return await super().receive(text_data, bytes_data)
