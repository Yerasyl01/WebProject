import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router  ) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.base}/api-token-auth/`, { username, password }).pipe(
      tap(res => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const msg = err.status === 401 ? 'Неверный логин или пароль.' : 'Ошибка подключения к серверу.';
        return throwError(() => new Error(msg));
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
