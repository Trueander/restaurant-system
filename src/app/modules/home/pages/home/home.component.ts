import { Component } from '@angular/core';

export interface Route {
  name: string;
  route: string;
  fontAwesomeIcon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  app_routes: Route[] = [
    { name: 'Dashboard', route: 'dashboard', fontAwesomeIcon:'fa-solid fa-chart-line'},
    { name: 'Orders', route: 'orders', fontAwesomeIcon:'fa-solid fa-list-check'},
    { name: 'Products', route: 'products', fontAwesomeIcon:'fa-solid fa-utensils'},
    { name: 'Tables', route: 'tables', fontAwesomeIcon:'fa-solid fa-chair'},
    { name: 'Customers', route: 'customers', fontAwesomeIcon:'fa-solid fa-users'},
    { name: 'Employees', route: 'employees', fontAwesomeIcon:'fa-solid fa-users-gear'}
  ] 
}
