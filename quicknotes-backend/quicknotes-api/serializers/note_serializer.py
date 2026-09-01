from config.models.note import Note
from rest_framework.serializers import ModelSerializer
from serializers import CollectionSerializer

class NoteSerializer(ModelSerializer):
    collection_data = CollectionSerializer(source="collection", read_only=True)

    class Meta:
        model = Note
        fields = "__all__"