from django.shortcuts import redirect, render
from django.contrib.auth import logout

def home(request):
  return render(request, "accounts/home.html")


def logout_view(request):
  logout(request)
  return redirect("/")