import { Component, OnInit } from '@angular/core';
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

  page = 4;
  size = 8;

  products: Product[] = [];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit() {
    this.productService.getProducts();
    this.productService.listOfProducts.subscribe(response => {
      console.log(response)
      this.products = response;
    })
  }

}