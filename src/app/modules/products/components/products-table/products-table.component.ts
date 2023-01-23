import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit{
  columns: string[] = ['name', 'price', 'created', 'stock', 'category', 'status', 'actions']

  page = 0;
  size = 6;

  products: Product[] = [];

  paginatorResult: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts(this.page);  
  }

  onPageChange(pageEvent: PageEvent): void {
    this.getProducts(pageEvent.pageIndex);  
  }

  getProducts(page: number): void {
    this.productService.getProductsPageable(page, this.size)
        .subscribe(response => {
          this.products = response.content as Product[];
          this.paginatorResult = response;
          console.log(this.products)
        })
  }

}