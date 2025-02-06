from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', views.GetUserProfile.as_view(), name='user_profile'),
    path('api/register/', views.CreateUserView.as_view(), name='register'),
    path('api/update-password/', views.UpdatePasswordView.as_view(), name='update_password'),
    path('api/delete-user/', views.DeleteUserView.as_view(), name='delete_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/blueprint/', views.CreateContentBlock.as_view(), name='blueprint'),
    path('api/blueprint/delete/<int:pk>', views.DeleteContentBlock.as_view(), name='delete_content_block'),
    path('api/user/feedback', views.UserFeedbackView.as_view(), name='feedback'),
    path('api/auth', views.CheckAuthenticationView.as_view(), name='auth'),
    path('api/list/users', views.ListUsersView.as_view(), name='list_users'),
    path('api/update-user-role/<int:pk>', views.UpdateUserRoleView.as_view(), name='update_user_role'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
