import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/core/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnChanges{
  columns: string[] = ['name', 'price', 'stock', 'category', 'status', 'actions']

  page: number = 0;
  size: number = 6;

  products: Product[] = [];
  productsAux: Product[] = [];

  paginatorResult: any;
  paginatorResultAux: any;
  productsTimesCalled: number = 0;

  @Input() productName!: string;
  @Input() categoryId!: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts(this.page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.productName && this.productName.length >= 3 || (this.productName.length == 0 && this.categoryId)) {
      this.cleanProductsAndPagination();
      this.getFilterProducts(0);
    }

    if(this.productName.length == 0 && this.categoryId == undefined && this.productsTimesCalled > 0) {
      this.getProducts(this.page);
    }
  }


  onPageChange(pageEvent: PageEvent): void {
    if(this.productName.length == 0 && this.categoryId === undefined){
      this.getProducts(pageEvent.pageIndex);
      return
    }

    this.getFilterProducts(pageEvent.pageIndex);
  }

  getProducts(page: number): void {
    this.productService.getProductsPageable(page, this.size)
        .subscribe(response => {
          this.validateAndSetResponse(response);
          this.productsTimesCalled++;
          if(response != null) {
            this.productsAux = this.products
            this.paginatorResultAux = response;
          }
          
        })
  }

  getFilterProducts(page: number) {
    this.productService.filterProducts(page, this.size, this.productName, this.categoryId)
        .subscribe(response => {
          this.validateAndSetResponse(response);
        });
  }

  validateAndSetResponse(response: any) {
    response == null ? this.cleanProductsAndPagination() : this.setProductResponse(response);
  }

  cleanProductsAndPagination(): void {
    this.products = [];
    this.paginatorResult = undefined;
  }

  setProductResponse(response: any): void {
    this.products = response.content as Product[];
    this.paginatorResult = response;
  }
}