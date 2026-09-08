from rest_framework.pagination import CursorPagination
from rest_framework.response import Response

# Paginazione basata su cursore: ideale per performance elevate su dataset dinamici.
# Riordina per 'id' (richiesto univoco), imposta 20 risultati di default
# e permette al client di modificarlo via query param '?page_size=' (max 100).
class CustomPagination(CursorPagination):
    ordering = 'id'
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
    
    # Personalizza la struttura della risposta JSON restituendo le chiavi 'next', 'previous' e 'data'
    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'data': data
        })