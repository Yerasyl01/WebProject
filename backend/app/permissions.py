from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permission are allowed to any request,
        # So we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet
        return obj.owner == request.user

class IsCompanyOwner(permissions.BasePermission):
    """
    Custom permission to only allow boss of an employee to view and edit it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.company.owner == request.user

class IsCompanyOwnerOrReadOnly(permissions.BasePermission):
    """"
    Custom permission to only allow boss of an employee to edit it.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.company.owner == request.user
