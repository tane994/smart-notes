from quicknotes_api.models.collection import  Collection
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from quicknotes_api.serializers.collection_serializer import CollectionWithNotesSerializer, CollectionSerializer
#from django.db import connection
from rest_framework.decorators import action

class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})

    @action(detail=True, methods=['GET'])
    def notes(self, request, pk=None):
        collection = Collection.objects.prefetch_related('notes').get(pk=pk)
        # serializer = CollectionSerializer(collection)
        # serializer_notes = NoteSerializer(collection.notes, many=True)
        # return Response({'data': {**dict(serializer.data), 'notes':serializer_notes.data}})
        serializer = CollectionWithNotesSerializer(collection)
        return Response({'data': serializer.data})