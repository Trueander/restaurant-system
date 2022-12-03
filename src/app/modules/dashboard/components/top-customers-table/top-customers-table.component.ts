import { Component } from '@angular/core';

@Component({
  selector: 'app-top-customers-table',
  templateUrl: './top-customers-table.component.html',
  styleUrls: ['./top-customers-table.component.scss']
})
export class TopCustomersTableComponent {
  data: Array<any> = [
    {
      name: `Double Burger`,
      orders: 33,
      worth: 'S/. 324.44'
  },
  {
      name: `Mix Burger`,
      orders: 18,
      worth: 'S/. 1324.44'
  },
  {
      name: `Special Pizza`,
      orders: 17,
      worth: 'S/. 533.15'
  },
  {
    name: `Chicken Sandwich`,
    orders: 14,
    worth: 'S/. 444.33'
}
  ];
}
