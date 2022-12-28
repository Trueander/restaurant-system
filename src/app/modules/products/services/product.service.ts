import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';

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

  getProducts(): Product[] {
    let products = [];
    let producto = new Product();
    producto.id = "1000"
    producto.name = "Double hamburger"
    producto.stock = 42
    let producto1 = new Product();
    producto1.id = "1001"
    producto1.name = "Pizza"
    producto1.stock = 34
    let producto2 = new Product();
    producto2.id = "1002"
    producto2.name = "Inka Kola"
    producto2.stock = 24
    let producto3 = new Product();
    producto3.id = "1003"
    producto3.name = "Bisteak"
    producto3.stock = 14
    products.push(producto)
    products.push(producto1)
    products.push(producto2)
    products.push(producto3)
    return products;
  }

  sendCloseModal(){
    this.closeModal.next(true);
  }

  getCloseModalValue(): Observable<Boolean> {
    return this.closeModal.asObservable();
  }

  filterByName(name: string): Observable<Product[]> {
    return of(this.getProducts()).pipe(
      map(value => {
        return value.filter(p => p.name.includes(name))
      })
    );
  }
}
