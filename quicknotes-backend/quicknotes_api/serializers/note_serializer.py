from rest_framework.serializers import ModelSerializer
from quicknotes_api.models.note import Note
import quicknotes_api.serializers.collection_serializer as collection_serializer


class NoteSerializer(ModelSerializer):
    collection_data = collection_serializer.CollectionSerializer(source="collection", read_only=True)

    class Meta:
        model = Note
        fields = "__all__"