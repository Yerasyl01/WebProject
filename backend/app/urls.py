from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path("companies/", views.companies_list),
    path("companies/<int:pk>/", views.companies_detail),
    path("employees/", views.EmployeeList.as_view()),
    path("employees/<int:pk>/", views.EmployeeDetail.as_view()),
    path("users/", views.UserList.as_view()),
    path("users/<int:pk>/", views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
