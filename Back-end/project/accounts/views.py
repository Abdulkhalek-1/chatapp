from django.contrib.auth import logout
from django.db import IntegrityError
from rest_framework import (
    generics,
    status,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
)
from django.contrib.auth import (
    authenticate,
    login,
    logout,
)
from django.contrib.auth.models import User
from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    SendFriendRequestSerializer,
    FriendRequestsSerializer,
    UserProfileEditSerializer,
)
from .models import UserProfile, FriendShip


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        try:
            user = serializer.save()
            user.set_password(serializer.validated_data["password"])
            user.save()
            login(self.request, user)  # Log in the user after registration
            return Response(
                {"detail": "User registered and logged in"},
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {"detail": "User with the same username or email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = self.request.query_params.get("id")
        if id is not None:
            try:
                user_profile = UserProfile.objects.get(id=id)
                serializer = UserProfileSerializer(user_profile)
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            except UserProfile.DoesNotExist:
                return Response(
                    {"detail": "User profile not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            user_profile = self.request.user.userprofile
            serializer = UserProfileSerializer(user_profile)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

    def patch(self, request, *args, **kwargs):
        user_profile = self.request.user.userprofile

        serializer = UserProfileEditSerializer(
            user_profile,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserLoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(
                request,
                username=username,
                password=password,
            )
            if user is not None:
                login(request, user)
                return Response(
                    {"successful": "true"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request, *args, **kwargs):
        return Response({})


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return Response(
            {"message": "logged out"},
            status=status.HTTP_200_OK,
        )


class SendFriendRequestView(generics.CreateAPIView):
    queryset = FriendShip.objects.all()
    serializer_class = SendFriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            sender = UserProfile.objects.get(user=user)
            receiver = serializer.validated_data["receiver"]

            # Check if there's an existing friend request
            existing_request = (
                FriendShip.objects.filter(
                    sender=sender,
                    receiver=receiver,
                ).first()
                or FriendShip.objects.filter(
                    sender=receiver,
                    receiver=sender,
                ).first()
            )

            if sender == receiver:
                return Response(
                    {"detail": "Can't send friend request to yourself"},
                    status=status.HTTP_406_NOT_ACCEPTABLE,
                )

            if existing_request:
                request_status = existing_request.status
                if request_status == "accepted":
                    return Response(
                        {"detail": "Friend already Exists"},
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )
                elif request_status == "waiting":
                    return Response(
                        {"detail": "Friend request already sent"},
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )
                elif request_status == "rejected":
                    return Response(
                        {"detail": "Friend request rejected"},
                        status=status.HTTP_406_NOT_ACCEPTABLE,
                    )
            else:
                serializer.save(sender=sender)
                return Response(
                    {"detail": "Friend Request Sent"},
                    status=status.HTTP_201_CREATED,
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class FriendRequestsView(APIView):
    serializer_class = FriendRequestsSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        profile = UserProfile.objects.get(user=user)
        friend_requests = FriendShip.objects.filter(receiver=profile, status="waiting")

        # Pass the request context to the serializer
        serializer = self.serializer_class(
            friend_requests,
            many=True,
            context={"request": request},
        )
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def put(self, request):
        id = request.data["id"]
        profile = UserProfile.objects.get(id=id)
        try:
            friend_request = FriendShip.objects.get(sender=profile)
        except FriendShip.DoesNotExist:
            return Response(
                {"detail": "Friend request not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        receiver_profile = UserProfile.objects.get(user=request.user)
        if (
            friend_request.receiver == receiver_profile
            and friend_request.status == "waiting"
        ):
            friend_request.status = "accepted"
            friend_request.save()
            return Response(
                {"detail": "Friend request accepted"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"detail": "Friend request cannot be accepted"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request):
        id = request.data["id"]
        profile = UserProfile.objects.get(id=id)
        try:
            friend_request = FriendShip.objects.get(sender=profile)
        except FriendShip.DoesNotExist:
            return Response(
                {"detail": "Friend request not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        receiver_profile = UserProfile.objects.get(user=request.user)
        if (
            friend_request.receiver == receiver_profile
            and friend_request.status == "waiting"
        ):
            friend_request.status = "rejected"
            friend_request.save()
            return Response(
                {"detail": "Friend request rejected"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"detail": "Friend request cannot be rejected"},
            status=status.HTTP_400_BAD_REQUEST,
        )
