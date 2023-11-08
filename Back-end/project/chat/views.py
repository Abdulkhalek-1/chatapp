from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status, viewsets
import datetime
from .serializers import MessageSerializer, MessageCreateSerializer
from .models import Message, ChatChannel
from accounts.models import UserProfile


# Create your views here.
def test(request):
    return render(request, "test.html")


class MessagesView(APIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def has_access_channel(self, request, channel_id):
        user_profile = UserProfile.objects.get(user=request.user)
        try:
            channel = ChatChannel.objects.get(members=user_profile, id=channel_id)
            return channel
        except ChatChannel.DoesNotExist:
            return False

    def has_access_message(self, request, message_id):
        user_profile = UserProfile.objects.get(user=request.user)
        try:
            message = Message.objects.get(sender=user_profile, id=message_id)
            return message
        except Message.DoesNotExist:
            return False

    def get(self, request, *args, **kwargs):
        channel = self.has_access_channel(request, self.kwargs.get("channel_id"))
        if channel:
            message_id = self.kwargs.get("message_id")
            if message_id:
                try:
                    messages = Message.objects.filter(id=message_id)
                except Message.DoesNotExist:
                    messages = []
            else:
                limit = int(request.query_params.get("limit", 10))
                before = request.query_params.get("before")

                # Construct a filter to retrieve messages before the specified ID
                filter_condition = Q(
                    chat_channel=channel, sent_at__lt=before or datetime.datetime.now()
                )

                try:
                    messages = Message.objects.filter(filter_condition).order_by(
                        "sent_at"
                    )[:limit]
                except Message.DoesNotExist:
                    messages = []

            serializer = self.serializer_class(
                messages, many=True, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.data, status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS
            )

    def post(self, request, *args, **kwargs):
        channel = self.has_access_channel(request, self.kwargs.get("channel_id"))
        if channel:
            sender = UserProfile.objects.get(user=request.user)
            content = request.data["content"]
            Message.objects.create(chat_channel=channel, sender=sender, content=content)
            return Response({"message": "Message_sent"}, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"message": "access denied"},
                status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
            )

    def patch(self, request, *args, **kwargs):
        message = self.has_access_message(request, self.kwargs.get("message_id"))
        content = request.data["content"]
        if message:
            if content:
                message.content = content
                message.is_changed = True
                message.save()
            else:
                message.delete()
        else:
            return Response(
                {"message": "access denied"},
                status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
            )

    def delete(self, request, *args, **kwargs):
        message = self.has_access_message(request, self.kwargs.get("message_id"))
        if message:
            message.delete()
        else:
            return Response(
                {"message": "access denied"},
                status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
            )
