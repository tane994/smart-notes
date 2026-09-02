from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from quicknotes_api.serializers.user_serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response(
            {
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(access)
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)