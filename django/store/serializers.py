from rest_framework import serializers
from .models import Product, ProductImage, CartItem, Cart
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.urls import reverse


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
    title = serializers.CharField(source='product.title')
    description = serializers.CharField(source='product.description')
    regular_price = serializers.DecimalField(source='product.regular_price', max_digits=5, decimal_places=2)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'product_image', 'title', 'description', 'regular_price', 'total_price']

    def get_product_image(self, obj):
        images = ProductImage.objects.filter(product=obj.product)
        request = self.context.get('request')
        if request is not None:
            return [{'image': request.build_absolute_uri(image.image.url), 'alt_text': image.alt_text} for image in images]
        else:
            return [{'image': reverse('placeholder-image'), 'alt_text': image.alt_text} for image in images]
    
    def get_total_price(self, obj):
        return obj.total_price()