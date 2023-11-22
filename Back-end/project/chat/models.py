from django.db import models


class Message(models.Model):
   id = models.AutoField(primary_key=True)
   chat_channel = models.ForeignKey("ChatChannel", on_delete=models.CASCADE)
   sender = models.ForeignKey("accounts.UserProfile", on_delete=models.SET_NULL, null=True)
   sent_at = models.DateTimeField(auto_now_add=True)
   changed_at = models.DateTimeField(auto_now=False, blank=True, null=True)
   content = models.CharField(max_length=4000, blank=True, null=True)
   
   def __str__(self) -> str:
      return f"{self.sender}-{self.chat_channel.id}-{self.id}"


class MessageRead(models.Model):
   users = models.ManyToManyField("accounts.UserProfile")
   message = models.OneToOneField(Message, on_delete=models.CASCADE)

   class Meta:
      indexes = [
         models.Index(fields=['message']),
      ]
   
   def __str__(self) -> str:
      return f"{self.message.chat_channel.id}-{self.message.id}"


class Attachment(models.Model):
   id = models.AutoField(primary_key=True)
   message = models.ForeignKey(Message, on_delete=models.CASCADE)
   file = models.FileField(upload_to=r"messages/%d-%m-%Y")
   
   def __str__(self) -> str:
      return f"{self.id}-{self.message.id}"


class Reaction(models.Model):
   id = models.AutoField(primary_key=True)
   emoji = models.CharField(max_length=255)
   message = models.ManyToManyField(Message)


class ChatChannel(models.Model):
   id = models.AutoField(primary_key=True)
   members = models.ManyToManyField("accounts.UserProfile")
   is_dm = models.BooleanField(default=False)
   title = models.CharField(max_length=75, default="channel")
   
   def __str__(self) -> str:
      return self.title
