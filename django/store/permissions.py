from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.cart.user == request.user