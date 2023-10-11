from django.http import HttpResponseNotFound
from django.urls import reverse

class AdminRestrictMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and request.user.is_superuser:
            return self.get_response(request)

        # You can customize this condition to check for specific permissions.
        if request.path.startswith(reverse('admin:index')):
            return HttpResponseNotFound()

        return self.get_response(request)
