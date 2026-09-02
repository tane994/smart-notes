from rest_framework.serializers import ModelSerializer
from quicknotes_api.models.collection import Collection

# 1. Definisci prima la classe base che non ha dipendenze verso le note
class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'


from quicknotes_api.serializers.note_serializer import NoteSerializer


class CollectionWithNotesSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"