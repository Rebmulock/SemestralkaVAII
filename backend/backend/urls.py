from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.LoginUserView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/blueprint/', views.CreateContentBlock.as_view(), name='blueprint'),
    path('api/blueprint/delete/<int:pk>', views.DeleteContentBlock.as_view(), name='delete_content_block'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
