import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMsg = 'Заполните все поля.';
      return;
    }
    this.errorMsg = '';
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: (err) => { this.loading = false; this.errorMsg = err.message; }
    });
  }
}