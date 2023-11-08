from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
   sender_data = serializers.SerializerMethodField()
   class Meta:
      model = Message
      exclude = ["sender"]
   
   def get_sender_data(self, obj):
      user = obj.sender.user
      sender_profile = obj.sender
      
      return {
         "username": user.username,
         "id": user.id,
         "bio": sender_profile.bio,
         "picture": str(sender_profile.picture.url),
      }

class MessageCreateSerializer(serializers.ModelSerializer):
   content = serializers.CharField(max_length=4000)


