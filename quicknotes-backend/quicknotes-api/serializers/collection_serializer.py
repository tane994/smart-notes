from rest_framework.serializers import ModelSerializer
from config.models.collection import Collection
from serializers.note_serializer import NoteSerializer

class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
        

class CollectionWithNotesSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"