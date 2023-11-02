from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile, FriendShip
from chat.models import ChatChannel
from django.contrib.auth.models import User


@receiver(post_save, sender=User)
def post_save_create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=FriendShip)
def post_save_add_frind(sender, created, instance, **kwargs):
    sender_ = instance.sender
    receiver_ = instance.receiver
    if instance.status=="accepted":
        sender_.friends.add(receiver_.user)
        receiver_.friends.add(sender_.user)
        chat_channel = ChatChannel.objects.create(is_dm=True, title=[receiver_.user.username, sender_.user.username])
        chat_channel.members.add(sender_, receiver_)
        sender_.save()
        receiver_.save()