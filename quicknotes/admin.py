from django.contrib import admin
from quicknotes.models import Note, Collection

admin.site.register(Note)
admin.site.register(Collection)