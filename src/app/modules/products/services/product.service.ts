import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getCategories(): Category[] {
    return [
      {
        id: '1', name:'Main Plates', icon: 'fa-solid fa-plate-wheat',
      },
      {
        id: '2', name:'Desserts', icon: 'fa-solid fa-cake-candles',
      },
      {
        id: '3', name:'Hamburguers', icon: 'fa-solid fa-burger',
      },
      {
        id: '4', name:'Pizzas', icon: 'fa-solid fa-pizza-slice',
      },
      {
        id: '5', name:'Drinks', icon: 'fa-solid fa-martini-glass',
      }
      ];
  }
}
