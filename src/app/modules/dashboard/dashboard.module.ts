import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopProductsTableComponent } from './components/top-products-table/top-products-table.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { TopCustomersTableComponent } from './components/top-customers-table/top-customers-table.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    DashboardComponent,
    TopProductsTableComponent,
    LineChartComponent,
    CardItemComponent,
    TopCustomersTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatChipsModule
  ]
})
export class DashboardModule { }
