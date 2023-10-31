from django.contrib import admin
from .models import UserProfile, FriendShip

admin.site.register(UserProfile)
admin.site.register(FriendShip)