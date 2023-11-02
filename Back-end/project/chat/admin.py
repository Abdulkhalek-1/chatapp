from django.contrib import admin
from .models import ChatChannel, Message

# Register your models here.
admin.site.register(ChatChannel)
admin.site.register(Message)
