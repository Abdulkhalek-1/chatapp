from rest_framework import (
    serializers,
)
from .models import (
    UserProfile,
    FriendShip,
)
from django.contrib.auth.models import (
    User,
)
from django.contrib.auth import (
    password_validation,
)
from django.core.exceptions import (
    ValidationError,
)


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    friends = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_username(self, obj):
        return obj.user.username

    def get_friends(self, obj):
        friends = obj.friends.all()
        friend_data = []
        for friend in friends:
            friend_profile = UserProfile.objects.get(user=friend)
            friend_data.append(
                {
                    "username": friend.username,
                    "id": friend.id,
                    "bio": friend_profile.bio,
                    "picture": str(friend_profile.picture.url),
                }
            )

        return friend_data


class UserProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "bio",
            "picture",
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "password_confirm",
            "first_name",
            "last_name",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def validate(self, data):
        password = data.get("password")
        password_confirm = data.get("password_confirm")
        if password and password_confirm and password != password_confirm:
            raise serializers.ValidationError({"password": "Passwords must match."})

        if not password:
            raise serializers.ValidationError({"password": "This field is required."})

        if not password_confirm:
            raise serializers.ValidationError(
                {"password_confirm": "This field is required."}
            )

        if not data.get("first_name"):
            raise serializers.ValidationError({"first_name": "This field is required."})

        if not data.get("last_name"):
            raise serializers.ValidationError({"last_name": "This field is required."})

        email = data.get("email")
        if not email:
            raise serializers.ValidationError({"email": "This field is required."})

        if not email.endswith("@gmail.com"):
            raise serializers.ValidationError(
                {"email": "Only Gmail addresses are allowed."}
            )

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        return user


class SendFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendShip
        fields = ("receiver",)


class FriendRequestsSerializer(serializers.ModelSerializer):
    sender_data = serializers.SerializerMethodField()

    class Meta:
        model = FriendShip
        exclude = (
            "status",
            "updated_at",
            "receiver",
            "sender",
        )

    def get_sender_data(self, obj):
        user = obj.sender.user
        sender_profile = UserProfile.objects.get(user=user)
        return {
            "username": user.username,
            "id": user.id,
            "bio": sender_profile.bio,
            "picture": str(sender_profile.picture.url),
        }


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class AcceptFriendRequestSerializer:
    pass
