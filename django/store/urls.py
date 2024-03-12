from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import CartItemViewSet
from . import views

app_name = "store"

router = DefaultRouter()
router.register(r'items', CartItemViewSet, basename='cart_items')

urlpatterns = [
    path('api/', views.ProductListView.as_view(), name="store_home"),
    path('api/cart/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    re_path('api/auth/', include('djoser.urls.authtoken')),
    path('api/<slug:slug>/', views.ProductView.as_view(), name="product"),
]