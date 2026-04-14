from django.db import models

# Create your models here.
class Taxation(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Bookeeper(models.Model):
    surname = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=255)
    registration = models.DateField(auto_now_add=True)
    taxation = models.ForeignKey(Taxation, on_delete=models.SET_NULL, null=True)
    bookeeper = models.ForeignKey(Bookeeper, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    surname = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    salary = models.IntegerField()

    def __str__(self):
        return self.name
