from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import (
    Category,
    ProductType,
    ProductSpecification,
    Product,
    ProductSpecificationValue,
    ProductImage,
    Cart,
    CartItem,
)

admin.site.register(Category, MPTTModelAdmin)



class ProductSpecificationInLine(admin.TabularInline):
    model = ProductSpecification
    
@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    inlines = [ProductSpecificationInLine]
    

class ProductImageInLine(admin.TabularInline):
    model = ProductImage
    
class ProductSpecificationValueInLine(admin.TabularInline):
    model = ProductSpecificationValue

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductSpecificationValueInLine,
        ProductImageInLine,
    ]

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]
    
