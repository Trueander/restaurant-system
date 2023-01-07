import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private closeModal = new BehaviorSubject<Boolean>(false);
  private products = new BehaviorSubject<Product[]>([]);

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
    let products: Product[] = [
      {
        id: '1',
        name: `Double Burger`,
        description: '',
        price: 33,
        createdAt: '2022-11-13',
        stock: 4,
        imageUrl: '',
        active: true,
        category: this.getCategories()[0]
    },
    {
      id: '2',
      name: `Special Pizza`,
      description: '',
      price: 33,
      createdAt: '2022-11-13',
      stock: 4,
      imageUrl: '',
      active: false,
      category: this.getCategories()[0]
  },
  {
    id: '3',
    name: `Mix Burger`,
    description: '',
    price: 332222.33,
    createdAt: '2022-11-13',
    stock: 4,
    imageUrl: '',
    active: false,
    category: this.getCategories()[0]
  },
  {
    id: '4',
    name: `Chicken Sandwich`,
    description: '',
    price: 33,
    createdAt: '2022-11-13',
    stock: 4,
    imageUrl: '',
    active: true,
    category: this.getCategories()[0]
  }
    ];
  
  
    this.products.next(products);
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

  set addProducts(product: Product) {
    this.products.next([...this.getProducts(), product])
  }

  get listOfProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }
}
