from django.db import models


class Message(models.Model):
   id = models.AutoField(primary_key=True)
   sent_at = models.DateTimeField(auto_now_add=True)
   is_changed = models.BooleanField(default=False)
   sender = models.ForeignKey("accounts.UserProfile", on_delete=models.PROTECT)
   chat_channel = models.ForeignKey("ChatChannel", on_delete=models.CASCADE)
   content = models.CharField(max_length=4000)
   
   def __str__(self) -> str:
      return f"{self.sender}-{self.chat_channel}"


class ChatChannel(models.Model):
   id = models.AutoField(primary_key=True)
   members = models.ManyToManyField("accounts.UserProfile")
   is_dm = models.BooleanField(default=False)
   title = models.CharField(max_length=75, default="channel")
   
   def __str__(self) -> str:
      return self.title
