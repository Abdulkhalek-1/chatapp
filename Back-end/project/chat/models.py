from django.db import models


class Message(models.Model):
  sender = models.CharField(max_length=30)
  receiver = models.CharField(max_length=30)
  sent_at = models.DateTimeField(auto_now_add=True)
  content = models.CharField(max_length=500)
  # received = models.BooleanField()
  # seen = models.BooleanField()
