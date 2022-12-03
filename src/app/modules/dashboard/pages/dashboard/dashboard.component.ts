import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardsInfo: any[] = [];

  ngOnInit(): void {
    this.loadCards()
  }

  loadCards() {
    this.cardsInfo = [
      {
        title: 'Total orders',
        value: '320',
        percentageValue: '10',
        isPositive: true,
        icon: 'fa-solid fa-list-check'
      },
      {
        title: 'Total profit',
        value: 'S/. 12.5k',
        percentageValue: '26',
        isPositive: false,
        icon: 'fa-solid fa-money-bills'
      },
      {
        title: 'Products sold',
        value: '224',
        percentageValue: '16',
        isPositive: true,
        icon: 'fa-solid fa-utensils'
      },
      {
        title: 'New Customers',
        value: '43',
        percentageValue: '17',
        isPositive: true,
        icon: 'fa-solid fa-users'
      }
    ]
  }

}
