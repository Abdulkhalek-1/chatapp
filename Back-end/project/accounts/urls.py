from django.urls import (
    path,
    include,
)
from rest_framework.routers import (
    DefaultRouter,
)
from . import views


urlpatterns = [
    path(
        "api/v1/users/friends/",
        views.FriendRequestsView.as_view(),
        name="user-friend-requests",
    ),
    path(
        "api/v1/users/friends/add/",
        views.SendFriendRequestView.as_view(),
        name="user-add-friend",
    ),
    path(
        "api/v1/users/register/",
        views.UserCreateView.as_view(),
        name="user-register",
    ),
    path(
        "api/v1/users/login/",
        views.UserLoginView.as_view(),
        name="user-login",
    ),
    path(
        "api/v1/users/logout/",
        views.UserLogoutView.as_view(),
        name="user-logout",
    ),
    # path(
    #     "api/v1/users/profile/<int:id>/",
    #     views.UserProfileView.as_view(),
    #     name="user-profile",
    # ),
    path(
        "api/v1/users/profile/",
        views.UserProfileView.as_view(),
        name="user-profile",
    ),
]
