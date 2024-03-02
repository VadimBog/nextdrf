from django.urls import path, include, re_path
from . import views

app_name = "store"

urlpatterns = [
    path('api/', views.ProductListView.as_view(), name="store_home"),
    path('api/<slug:slug>/', views.ProductView.as_view(), name="product"),
    path('api/auth/', include('djoser.urls')),
    re_path('api/auth/', include('djoser.urls.authtoken')),
]