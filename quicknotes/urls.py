from django.contrib import admin
from django.urls import include, path
from quicknotes import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('notes', views.NoteViewSet)
router.register('collections', views.CollectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    
    # templeted site
    path('notes/', include('quicknotes_site.urls')),
    
    # api
    path('api/', include(router.urls)),
    
    # auth
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
