import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductRegistrationRequest } from 'src/app/core/models/product-registration-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlBackend: string = `${environment.URL_BACKEND}/api/products`;

  private closeModal = new BehaviorSubject<Boolean>(false);
  private products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProductsPageable(page: number, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    return this.http.get<any>(`${this.baseUrlBackend}`,{params: params});
  }

  filterProducts(page: number, size: number, productName: string, categoryId?: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    params = params.set('productName', productName);
    if(categoryId !== undefined) params = params.set('categoryId', categoryId);

    return this.http.get<any>(`${this.baseUrlBackend}/search`,{params: params});
  }

  createProduct(product: ProductRegistrationRequest): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrlBackend}`, product);
  }

  updateProduct(productId: number, product: ProductRegistrationRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrlBackend}/${productId}`, product);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrlBackend}/${productId}`);
  }

  sendCloseModal(){
    this.closeModal.next(true);
  }

  getCloseModalValue(): Observable<Boolean> {
    return this.closeModal.asObservable();
  }

}
