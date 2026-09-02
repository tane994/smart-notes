from django.db import models
from .collection import Collection

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    
    # Collection viene definito come parent di Note
    # related_name serve per collection per accedere alle related notes
    # null=True vuol dire che una nota può anche non avere un parente
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='notes', null=True)
    
    def __str__(self):
        return self.title
    
    def __repr__(self):
        return self.__str__()