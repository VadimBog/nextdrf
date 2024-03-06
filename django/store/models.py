from django.db import models
from django.urls import reverse
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.auth.models import User


class Category(MPTTModel):
    name = models.CharField(
        verbose_name=('Category Name'),
        help_text=('Required and unique'),
        max_length=255,
        unique=True)
    slug = models.SlugField(verbose_name=('Category safe url'), max_length=255, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    is_active = models.BooleanField(default=True)
    
    class MPTTMeta:
        order_inspection_by = ['name']   #sort by name
        
    class Meta:
        verbose_name=('Category')
        verbose_name_plural=('Categories')
        
    def get_absolute_url(self):
        return reverse('store:category_list', args=[self.slug])
    
    def __str__(self):
        return self.name
    
    
class ProductType(models.Model):
    name = models.CharField(verbose_name=('Product Name'), help_text=('Required'), max_length=255)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name=('Product Type')
        verbose_name_plural=('Product Types')
    
    def __str__(self):
        return self.name
    
    
class ProductSpecification(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    name = models.CharField(verbose_name=('Name'), help_text=('Required'), max_length=255)
    
    class Meta:
        verbose_name=('Product Specification')
        verbose_name_plural=('Product Specifications')
        
    def __str__(self):
        return self.name
    
    
class Product(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(
        verbose_name=('title'),
        help_text=('Required'),
        max_length=255,   
    )
    description = models.TextField(verbose_name=("description"), help_text=("Not Required"), blank=True)
    slug = models.SlugField(max_length=255)
    regular_price = models.DecimalField(
        verbose_name=("Regular Price"),
        help_text=("Maximum 999.99"),
        error_messages={
            "name": {
                "max_lenght": ("The price must be between 0 and 999.99"),
            },
        },
        max_digits=5,
        decimal_places=2,
    )
    discount_price = models.DecimalField(
        verbose_name=("Regular Price"),
        help_text=("Maximum 999.99"),
        error_messages={
            "name": {
                "max_lenght": ("The price must be between 0 and 999.99"),
            },
        },
        max_digits=5,
        decimal_places=2,
    )
    is_active = models.BooleanField(
        verbose_name=("Product visibility"),
        help_text=("Change product visibility"),
        default=True,
    )
    created_at = models.DateTimeField(("Created_at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(("Updated_at"), auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name=('Product')
        verbose_name_plural=('Products')

    def get_absolute_url(self):
        return reverse('store:product_list', args=[self.slug])
    
    def __str__(self):
        return self.title
    
    
class ProductSpecificationValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    specification = models.ForeignKey(ProductSpecification, on_delete=models.RESTRICT)
    value = models.CharField(
        verbose_name=('value'),
        help_text=('Product speciification value (maximum of 255 words)'),
        max_length=255,   
    )
    
    class Meta:
        verbose_name=('Product Speciification Value')
        verbose_name_plural=('Product Speciification Values')
        
    def __str__(self):
        return self.value
    
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_image')
    image = models.ImageField(
        verbose_name=('image'),
        help_text=('Upload a product image'),
        upload_to="images/",
        default="images/default.png",
    )
    alt_text = models.CharField(
        verbose_name=('Alternative text'),
        help_text=('Add alternative text'),
        max_length=255,
        null=True,
        blank=True,
    )
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(("Created_at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(("Created_at"), auto_now_add=True)
    
    class Meta:
        verbose_name=('Product Image')
        verbose_name_plural=('Product Images')
        
# ======== Shopping cart models =================
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f'Cart for {self.user.username}'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} x {self.product.title}'

    def total_price(self):
        return self.quantity * self.product.regular_price