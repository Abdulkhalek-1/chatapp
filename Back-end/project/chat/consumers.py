import json, time
from . import models
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async


class ChatMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.receiver_id = self.scope["url_route"]["kwargs"]["receiver_id"]
        self.chat_room = f"user_{self.receiver_id}"
        await self.channel_layer.group_add(self.chat_room, self.channel_name)
        #! Check frind
        await self.accept()

    async def receive(self, text_data):
        print(text_data)
        await self.channel_layer.group_send(
            self.chat_room,
            {
                "type": "send_message",
                "message": text_data,
            },
        )

    async def send_message(self, event):
        # send message to SebSocket (front-end)
        await self.send(
            text_data=json.dumps(
                {
                    "message": event["message"],
                }
            )
        )
