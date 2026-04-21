import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Company } from '../services/api.service';

@Component({
  selector: 'app-buh',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buh.html',
  styleUrl: './buh.css'
})
export class BuhComponent implements OnInit {
  companies: Company[] = [];
  newName = '';
  searchTerm = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadCompanies(); }

  loadCompanies() {
    this.loading = true;
    this.errorMsg = '';
    this.api.getCompanies(this.searchTerm).subscribe({
      next: data => { this.companies = data; this.loading = false; },
      error: err => { this.errorMsg = err.message; this.loading = false; }
    });
  }

  addCompany() {
    if (!this.newName.trim()) { this.errorMsg = 'Введите название компании.'; return; }
    this.errorMsg = ''; this.successMsg = '';
    this.api.createCompany({ name: this.newName.trim() }).subscribe({
      next: () => {
        this.successMsg = `Компания "${this.newName}" добавлена!`;
        this.newName = '';
        this.loadCompanies();
      },
      error: err => { this.errorMsg = err.message; }
    });
  }

  deleteCompany(id: number, name: string) {
    if (!confirm(`Удалить компанию "${name}"?`)) return;
    this.errorMsg = ''; this.successMsg = '';
    this.api.deleteCompany(id).subscribe({
      next: () => { this.successMsg = 'Компания удалена.'; this.loadCompanies(); },
      error: err => { this.errorMsg = err.message; }
    });
  }
}