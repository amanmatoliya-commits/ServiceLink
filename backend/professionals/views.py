from rest_framework import generics
from .models import Professional
from .serializers import ProfessionalSerializer


class ProfessionalListView(generics.ListAPIView):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer