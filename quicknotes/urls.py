from django.contrib import admin
from django.urls import include, path
from quicknotes import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('notes/', include('quicknotes.urls_site')),
    path("api/notes/", views.api_notes, name="api_notes")
]
