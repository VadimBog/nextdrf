from rest_framework import serializers
from .models import Product, ProductImage, CartItem, Cart
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


class CartItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'product_image']

    def get_product_image(self, obj):
        images = ProductImage.objects.filter(product=obj.product)
        return ImageSerializer(images, many=True).data
