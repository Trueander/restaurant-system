import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  columns: string[] = ['name', 'price', 'created', 'stock', 'category', 'status', 'actions']

  page = 4;
  size = 8;

  category: Category = {
    id: '1',
    name: 'Hamburgers',
    icon: ''
  }

  products: Product[] = [
    {
      id: '1',
      name: `Double Burger`,
      description: '',
      price: 33,
      createdAt: '2022-11-13',
      stock: 4,
      imageUrl: '',
      active: true,
      category: this.category
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
    category: this.category
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
  category: this.category
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
  category: this.category
}
  ];

}
