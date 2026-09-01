from rest_framework.viewsets import ModelViewSet
from models.note import Note
from serializers.note_serializer import NoteSerializer
from rest_framework.response import Response
from config.models import Note
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from config.serializers import  NoteSerializer
#from django.db import connection

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        queryset = Note.objects.select_related('collection')
        collection_id = self.request.query_params.get('collection_id')
        if collection_id:
            queryset = queryset.filter(collection_id=collection_id)
        return queryset.order_by('id')
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'data': serializer.data})