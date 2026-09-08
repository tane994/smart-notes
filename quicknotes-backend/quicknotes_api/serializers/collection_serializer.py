from rest_framework.serializers import ModelSerializer
from quicknotes_api.models.collection import Collection

# ModelSerializer automatizza la creazione dei campi e la logica CRUD basandosi sul modello.
# L'ereditarietà (ModelSerializer) serve a integrare le funzioni di validazione e conversione di DRF.
class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'


from quicknotes_api.serializers.note_serializer import NoteSerializer


# Serializer esteso che include in sola lettura l'elenco delle note collegate alla collezione.
class CollectionWithNotesSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"