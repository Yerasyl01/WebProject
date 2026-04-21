from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Taxation, Bookeeper, Company, Employee

class TaxationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    description = serializers.CharField()
    companies = serializers.PrimaryKeyRelatedField(many=True, queryset=Company.objects.all())

    def create(self, validated_data):
        """
        Create and return a new 'Taxation' instance, given the validated data
        """
        return Taxation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing 'Taxation' instance, given the validated data
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

class BookeeperSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    surname = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=50)
    patronymic = serializers.CharField(max_length=50)
    companies = serializers.PrimaryKeyRelatedField(many=True, queryset=Company.objects.all())

    def create(self, validated_data):
        """
        Create and return a new 'Bookeeper' instance, given the validated data
        """
        return Bookeeper.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing 'Bookeeper' instance, given the validated data
        """
        instance.surname = validated_data.get('surname', instance.surname)
        instance.name = validated_data.get('name', instance.name)
        instance.patronymic = validated_data.get('patronymic', instance.patronymic)
        instance.save()
        return instance

class CompanySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    employees = serializers.PrimaryKeyRelatedField(many=True, queryset=Employee.objects.all())

    class Meta:
        model = Company
        fields = ['id', 'name', 'registration', 'taxation', 'bookeeper', 'owner', 'employees']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    companies = serializers.PrimaryKeyRelatedField(many=True, queryset=Company.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'companies']
