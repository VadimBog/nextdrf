# Generated by Django 5.0.2 on 2024-02-24 23:22

import django.db.models.deletion
import mptt.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductSpecification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Required', max_length=255, verbose_name='Name')),
            ],
            options={
                'verbose_name': 'Product Specification',
                'verbose_name_plural': 'Product Specifications',
            },
        ),
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Required', max_length=255, verbose_name='Product Name')),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Product Type',
                'verbose_name_plural': 'Product Types',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Required and unique', max_length=255, unique=True, verbose_name='Category Name')),
                ('slug', models.SlugField(max_length=255, unique=True, verbose_name='Category safe url')),
                ('is_active', models.BooleanField(default=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='store.category')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Category',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Required and unique', max_length=255, verbose_name='Category Name')),
                ('description', models.TextField(blank=True, help_text='Not Required', verbose_name='description')),
                ('slug', models.SlugField(max_length=255)),
                ('regular_price', models.DecimalField(decimal_places=2, error_messages={'name': {'max_lenght': 'The price must be between 0 and 999.99'}}, help_text='Maximum 999.99', max_digits=5, verbose_name='Regular Price')),
                ('discount_price', models.DecimalField(decimal_places=2, error_messages={'name': {'max_lenght': 'The price must be between 0 and 999.99'}}, help_text='Maximum 999.99', max_digits=5, verbose_name='Regular Price')),
                ('is_active', models.BooleanField(default=True, help_text='Change product visibility', verbose_name='Product visibility')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created_at')),
                ('updated_at', models.DateTimeField(auto_now_add=True, verbose_name='Created_at')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='store.category')),
                ('product_type', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='store.producttype')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, help_text='Please add alternative text', max_length=255, null=True, upload_to='', verbose_name='Alternative text')),
                ('is_feature', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created_at')),
                ('updated_at', models.DateTimeField(auto_now_add=True, verbose_name='Created_at')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_image', to='store.product')),
            ],
            options={
                'verbose_name': 'Product Image',
                'verbose_name_plural': 'Product Images',
            },
        ),
        migrations.CreateModel(
            name='ProductSpecificationValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(help_text='Product speciification value (maximum of 255 words)', max_length=255, verbose_name='value')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.product')),
                ('specification', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='store.productspecification')),
            ],
            options={
                'verbose_name': 'Product Speciification Value',
                'verbose_name_plural': 'Product Speciification Values',
            },
        ),
        migrations.AddField(
            model_name='productspecification',
            name='product_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='store.producttype'),
        ),
    ]
