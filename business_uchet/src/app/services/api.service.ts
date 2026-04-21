import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Company {
  id?: number;
  name: string;
}

export interface Employee {
  id?: number;
  surname: string;
  name: string;
  patronymic: string;
  company: number;
  salary: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8000/app';

  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let msg = 'Произошла ошибка. Попробуйте позже.';
    if (err.status === 0)   msg = 'Нет соединения с сервером.';
    if (err.status === 401) msg = 'Необходима авторизация.';
    if (err.status === 403) msg = 'Недостаточно прав.';
    if (err.status === 404) msg = 'Запись не найдена.';
    if (err.error?.detail)  msg = err.error.detail;
    return throwError(() => new Error(msg));
  }

  getCompanies(search = ''): Observable<Company[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Company[]>(`${this.base}/companies/`, { params })
      .pipe(catchError(this.handleError));
  }

  createCompany(data: Company): Observable<Company> {
    return this.http.post<Company>(`${this.base}/companies/`, data)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/companies/${id}/`)
      .pipe(catchError(this.handleError));
  }

  getEmployees(search = ''): Observable<Employee[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Employee[]>(`${this.base}/employees/`, { params })
      .pipe(catchError(this.handleError));
  }

  createEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.base}/employees/`, data)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/employees/${id}/`)
      .pipe(catchError(this.handleError));
  }
}