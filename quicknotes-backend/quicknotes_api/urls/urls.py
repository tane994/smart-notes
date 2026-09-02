from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Importa i file di viste dalla cartella views
from quicknotes_api.views import note_views, collection_views, auth_views, site_views

router = routers.DefaultRouter()
router.register('notes', note_views.NoteViewSet)
router.register('collections', collection_views.CollectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', site_views.home, name='home'),
    
    # IMPORTANTE: Indica esattamente la stringa del modulo 'quicknotes_api.urls.urls_site'
    path('notes/', include('quicknotes_api.urls.urls_site')),
    
    # IMPORTANTE: router.urls va passato direttamente senza avvolgerlo in include()
    path('api/', include(router.urls)),
    
    # Autenticazione
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', auth_views.register, name="register"),
]