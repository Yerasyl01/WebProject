import { Routes } from '@angular/router';
import { Home } from './home/home';
import { BuhComponent } from './buh/buh';
import { CrmComponent } from './crm/crm';
import { AnalyticsComponent } from './analytics/analytics';
import { ContactsComponent } from './contacts/contacts';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'buh', component: BuhComponent },
  { path: 'crm', component: CrmComponent },
  { path: 'analytics',component: AnalyticsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];