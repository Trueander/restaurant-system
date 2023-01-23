import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlBackend: string = 'http://localhost:8080/api/products';

  private closeModal = new BehaviorSubject<Boolean>(false);
  private products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProductsPageable(page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    return this.http.get<any>(`${this.baseUrlBackend}`,{params: params});
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrlBackend}`, product);
  }

  getCategories(): Category[] {
    return [
      {
        categoryId: 1, name:'Main Plates', icon: 'fa-solid fa-plate-wheat',
      },
      {
        categoryId: 2, name:'Desserts', icon: 'fa-solid fa-cake-candles',
      },
      {
        categoryId: 3, name:'Hamburguers', icon: 'fa-solid fa-burger',
      },
      {
        categoryId: 4, name:'Pizzas', icon: 'fa-solid fa-pizza-slice',
      },
      {
        categoryId: 5, name:'Drinks', icon: 'fa-solid fa-martini-glass',
      }
      ];
  }

  getProducts(): Product[] {
    let products: Product[] = []
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
