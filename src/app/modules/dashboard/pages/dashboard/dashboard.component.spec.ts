import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {TopProductsTableComponent} from "../../components/top-products-table/top-products-table.component";
import {TopCustomersTableComponent} from "../../components/top-customers-table/top-customers-table.component";
import {CardItemComponent} from "../../components/card-item/card-item.component";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, LineChartComponent, TopProductsTableComponent, TopCustomersTableComponent, CardItemComponent ],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form dashboard', () => {
    expect(component).toBeTruthy();
  });
});
