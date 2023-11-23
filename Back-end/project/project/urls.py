from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include


from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Chatapp API DOCS",
        default_version='v1',
        description="chatapp api docs",
        contact=openapi.Contact(email="abdulkhalek.muhammad.work@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path("accounts/", include("allau-th.urls")),
    path("", include("accounts.urls")),
    path("", include("chat.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
