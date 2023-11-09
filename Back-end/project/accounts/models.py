import uuid
from django.db import models
from django.contrib.auth.models import (
    User,
)
from django.contrib.auth.models import (
    AbstractUser,
)
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class FriendShip(models.Model):
    STATUS_CHOICES = (
        (
            "accepted",
            "accepted",
        ),
        (
            "waiting",
            "waiting",
        ),
        (
            "rejected",
            "rejected",
        ),
    )
    sender = models.ForeignKey(
        "UserProfile",
        related_name="sender",
        on_delete=models.CASCADE,
    )
    receiver = models.ForeignKey(
        "UserProfile",
        related_name="receiver",
        on_delete=models.CASCADE,
    )
    status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default="waiting",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.sender}-{self.receiver}-{self.status}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    friends = models.ManyToManyField(
        User,
        related_name="friends",
        blank=True,
    )
    bio = models.TextField()
    picture = models.ImageField(
        upload_to=r"profiles/",
        default=r"profiles/default.png",
    )

    def __str__(self):
        return f"@{self.user.username}"
