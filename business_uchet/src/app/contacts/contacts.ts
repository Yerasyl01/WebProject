import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class ContactsComponent {
  name = '';
  phone = '';
  email = '';
  message = '';
  successMsg = '';
  errorMsg = '';
  loading = false;

  onSubmit() {
    if (!this.name.trim() || !this.phone.trim()) {
      this.errorMsg = 'Заполните обязательные поля: Имя и Телефон.';
      return;
    }
    this.errorMsg = ''; this.loading = true;
    // Имитация отправки (замени на реальный API когда добавишь endpoint)
    setTimeout(() => {
      this.successMsg = '✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
      this.name = this.phone = this.email = this.message = '';
      this.loading = false;
    }, 800);
  }
}