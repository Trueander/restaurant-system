import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private closeModal = new BehaviorSubject<Boolean>(false);

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

  sendCloseModal(){
    this.closeModal.next(true);
  }

  getCloseModalValue(): Observable<Boolean> {
    return this.closeModal.asObservable();
  }
}
