from django.contrib import admin
from models.note import Note
from models.collection import Collection

admin.site.register(Note)
admin.site.register(Collection)