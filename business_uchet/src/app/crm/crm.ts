import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Employee } from '../services/api.service';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crm.html',
  styleUrl: './crm.css'
})
export class CrmComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm = '';
  newEmp: Employee = { surname: '', name: '', patronymic: '', company: 1, salary: 0 };
  errorMsg = '';
  successMsg = '';
  loading = false;
  showForm = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.loading = true; this.errorMsg = '';
    this.api.getEmployees(this.searchTerm).subscribe({
      next: data => { this.employees = data; this.loading = false; },
      error: err => { this.errorMsg = err.message; this.loading = false; }
    });
  }

  addEmployee() {
    if (!this.newEmp.surname || !this.newEmp.name) {
      this.errorMsg = 'Заполните фамилию и имя.'; return;
    }
    this.errorMsg = ''; this.successMsg = '';
    this.api.createEmployee(this.newEmp).subscribe({
      next: () => {
        this.successMsg = 'Сотрудник добавлен!';
        this.newEmp = { surname: '', name: '', patronymic: '', company: 1, salary: 0 };
        this.showForm = false;
        this.loadEmployees();
      },
      error: err => { this.errorMsg = err.message; }
    });
  }

  deleteEmployee(id: number, name: string) {
    if (!confirm(`Удалить сотрудника "${name}"?`)) return;
    this.api.deleteEmployee(id).subscribe({
      next: () => { this.successMsg = 'Сотрудник удалён.'; this.loadEmployees(); },
      error: err => { this.errorMsg = err.message; }
    });
  }
}