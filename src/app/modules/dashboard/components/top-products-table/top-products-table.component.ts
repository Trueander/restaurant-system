import { Component } from '@angular/core';

@Component({
  selector: 'app-top-products-table',
  templateUrl: './top-products-table.component.html',
  styleUrls: ['./top-products-table.component.scss']
})
export class TopProductsTableComponent {

  data: Array<any> = [
    {
      name: `Double Burger`,
      quantity: 33,
  },
  {
      name: `Mix Burger`,
      quantity: 18,
  },
  {
      name: `Special Pizza`,
      quantity: 17,
  },
  {
    name: `Chicken Sandwich`,
    quantity: 14,
}
  ];
}
