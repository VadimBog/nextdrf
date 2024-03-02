from rest_framework import serializers
from .models import Product, ProductImage, Cart
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text"]

class ProductSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ["id", "title", "description", "slug", "regular_price", "discount_price", "created_at", "product_image"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'user', 'products')
        read_only_fields = ('user',)