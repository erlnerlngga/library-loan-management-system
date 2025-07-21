"""
Serializers for the user API View.
"""
from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from django.utils.translation import gettext as _

from rest_framework import serializers

from core.models import Role

class RoleSerializer(serializers.ModelSerializer):
    """Serializer for the Role object."""


    class Meta:
        model = Role
        fields = ('id', 'name')
        read_only_fields = ['id']

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""
    roles = RoleSerializer(many=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password', 'roles']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 5}
        }


    def _get_or_create_roles(self, roles, user):
        """Handle getting or creating tags as needed."""
        for role in roles:
            role_obj, created = Role.objects.get_or_create(
                user=user,
                **role,
            )
            user.roles.add(role_obj)

    def create(self, validated_data):
        """Create and return a user with encrypted password."""
        roles_data = validated_data.pop("roles", [])
        user = get_user_model().objects.create_user(**validated_data)

        if roles_data:
            self._get_or_create_roles(roles_data, user)

        return user

    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        roles_data = validated_data.pop('roles', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        if roles_data is not None:
            user.roles.set(roles_data)

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token."""
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user."""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs