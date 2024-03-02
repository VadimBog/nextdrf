from rest_framework import generics
from .models import Product, Cart
from .serializers import ProductSerializer, CartSerializer
from django.contrib.auth.models import User



class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class ProductView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

    