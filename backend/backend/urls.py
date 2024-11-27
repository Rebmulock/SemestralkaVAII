from django.contrib import admin
from django.urls import path, include
from api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', UserView.as_view(), name='login'),
    path('auth/', include("rest_framework.urls")),
]
