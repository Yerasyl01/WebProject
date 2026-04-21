import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class AnalyticsComponent implements OnInit {
  companies: any[] = [];
  employees: any[] = [];
  errorMsg = '';
  loading = false;

  get totalEmployees() { return this.employees.length; }
  get avgSalary() {
    if (!this.employees.length) return 0;
    return Math.round(this.employees.reduce((s, e) => s + e.salary, 0) / this.employees.length);
  }
  get maxSalary() {
    if (!this.employees.length) return 0;
    return Math.max(...this.employees.map(e => e.salary));
  }

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.loading = true; this.errorMsg = '';
    this.api.getCompanies().subscribe({
      next: data => { this.companies = data; },
      error: err => { this.errorMsg = err.message; this.loading = false; }
    });
    this.api.getEmployees().subscribe({
      next: data => { this.employees = data; this.loading = false; },
      error: err => { this.errorMsg = err.message; this.loading = false; }
    });
  }
}