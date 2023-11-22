from django.http import HttpResponseNotFound
from django.urls import reverse
from django.middleware.csrf import get_token, CsrfViewMiddleware


class AdminRestrictMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and request.user.is_superuser:
            return self.get_response(request)
        if request.path.startswith(reverse("admin:index")):
            return HttpResponseNotFound()

        return self.get_response(request)
