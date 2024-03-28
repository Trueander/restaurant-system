import { Component } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/services/token.service';

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

  constructor(public tokenService: TokenService) { }

  app_routes: Route[] = [
    { name: 'Dashboard', route: 'dashboard', fontAwesomeIcon:'fa-solid fa-chart-line'},
    { name: 'Pedidos', route: 'orders', fontAwesomeIcon:'fa-solid fa-list-check'},
    { name: 'Productos', route: 'products', fontAwesomeIcon:'fa-solid fa-utensils'},
    { name: 'Mesas', route: 'tables', fontAwesomeIcon:'fa-solid fa-chair'},
    { name: 'Clientes', route: 'customers', fontAwesomeIcon:'fa-solid fa-users'},
    { name: 'Colaboradores', route: 'employees', fontAwesomeIcon:'fa-solid fa-users-gear'}
  ];
}
