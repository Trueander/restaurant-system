import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {ProductsTableComponent} from "../../components/products-table/products-table.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductsTableComponent ],
      imports: [HttpClientModule, SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form products', () => {
    expect(component).toBeTruthy();
  });
});
