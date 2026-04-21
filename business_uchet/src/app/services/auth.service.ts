import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8000';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.base}/api/token/`, { username, password }).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const msg = err.status === 401 ? 'Неверный логин или пароль.' : 'Ошибка подключения к серверу.';
        return throwError(() => new Error(msg));
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}