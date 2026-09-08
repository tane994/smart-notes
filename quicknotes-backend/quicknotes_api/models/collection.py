from django.db import models

class Collection(models.Model):
    name = models.CharField(max_length=255)
    
    # Rappresentazione formattata del modello destinata agli utenti.
    # È l'equivalente del toString(): determina come l'oggetto viene mostrato 
    # nell'admin panel di Django, nei form e quando viene stampato con print().
    def __str__(self):
        return self.name
    
    # Rappresentazione tecnica dell'oggetto destinata al debug e agli sviluppatori.
    # Viene usata ad esempio nella console/shell Python e quando l'oggetto si trova dentro una lista.
    def __repr__(self):
        return self.__str__()