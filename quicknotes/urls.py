from django.contrib import admin
from django.urls import include, path
from quicknotes import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('notes', views.NoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    
    # templeted site
    path('notes/', include('quicknotes_site.urls')),
    
    # api
    path('api/', include(router.urls))
]
