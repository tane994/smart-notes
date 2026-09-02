from django.db import models

class Collection(models.Model):
    name = models.CharField(max_length=255)
    
    # è il metodo toString essenzialmente se no si vedrebbe come oggetto
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return self.__str__()