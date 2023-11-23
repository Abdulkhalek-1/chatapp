from django.contrib import admin
from .models import ChatChannel, Message, MessageRead, Attachment, Reaction

# Register your models here.
admin.site.register(ChatChannel)
admin.site.register(Message)
admin.site.register(MessageRead)
admin.site.register(Attachment)
admin.site.register(Reaction)