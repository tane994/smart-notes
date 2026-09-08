# Il file admin.py serve a registrare i modelli nel pannello di amministrazione
# di Django per poterne gestire i dati tramite interfaccia web.
# (La struttura del database SQL viene invece gestita da models.py e dalle migrazioni).

from django.contrib import admin
from models.note import Note
from models.collection import Collection

admin.site.register(Note)
admin.site.register(Collection)