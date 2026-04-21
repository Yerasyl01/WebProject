from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import status, filters, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Company, Employee
from app.serializers import CompanySerializer, EmployeeSerializer, UserSerializer
from app.permissions import IsOwnerOrReadOnly, IsCompanyOwner, IsCompanyOwnerOrReadOnly

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def companies_list(request, format=None):
    """
    List all companies, or create a new company.
    """
    if request.method == 'GET':
        companies = Company.objects.all()

        search = request.query_params.get('search')
        if search:
            companies = companies.filter(
                Q(name__icontains=search)
            )

        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly])
def companies_detail(request, pk, format=None):
    """
    Retrieve, update or delete a company
    """
    company = get_object_or_404(Company, pk=pk)

    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EmployeeList(APIView):
    """
    List all employees, lookup for employee, or create a new one
    """
    permission_classes = [IsCompanyOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['surname', 'name', 'patronymic']

    def get(self, request, format=None):
        employees = Employee.objects.all()

        for backend in self.filter_backends:
            employees = backend().filter_queryset(request, employees, self)

        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            company = serializer.validated_data['company']

            if company.owner != request.user:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeDetail(APIView):
    """
    Retrieve, udpate or delete an employee instance
    """
    permission_classes = [IsCompanyOwner]

    def get_object(self, pk):
        return get_object_or_404(Employee, pk=pk)

    def get(self, request, pk, format=None):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        employee = self.get_object(pk)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        employee = self.get_object(pk)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
