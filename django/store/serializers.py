from rest_framework import serializers
from .models import Product, ProductImage, CartItem, ProductSpecification, ProductSpecificationValue
from django.urls import reverse


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text"]

class ProductSpecificationValueSerializer(serializers.ModelSerializer):
    specification = serializers.CharField(source='specification.name')

    class Meta:
        model = ProductSpecificationValue
        fields = ['specification', 'value']

class ProductSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    product_specifications = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ["id", "title", "description", "slug", "regular_price", "discount_price", "created_at", "product_image", "product_specifications"]

    def get_product_specifications(self, obj):
        product_specification_values = ProductSpecificationValue.objects.filter(product=obj)
        return ProductSpecificationValueSerializer(product_specification_values, many=True).data
    
class CartItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()
    title = serializers.CharField(source='product.title', required=False)
    description = serializers.CharField(source='product.description', required=False)
    regular_price = serializers.DecimalField(source='product.regular_price', max_digits=5, decimal_places=2, required=False)
    total_price = serializers.SerializerMethodField()
    cart = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'product_image', 'title', 'description', 'regular_price', 'total_price']

    def get_product_image(self, obj):
        images = ProductImage.objects.filter(product=obj.product)
        if not images:
            return None
        request = self.context.get('request')
        if request is not None:
            return [{'image': request.build_absolute_uri(image.image.url), 'alt_text': image.alt_text} for image in images]
        else:
            return [{'image': 'http://example.com/placeholder-image.jpg', 'alt_text': image.alt_text} for image in images]
    
    # calculate total price of cart item
    def get_total_price(self, obj):
        return obj.total_price()
    
    # create or update quantity cart item
    def create(self, validated_data):
        product = validated_data.get('product')
        quantity = validated_data.get('quantity')

        # Get the cart from the current user
        cart = self.context['request'].user.cart

        cart_item, created = CartItem.objects.get_or_create(
            product=product, 
            cart=cart, 
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item