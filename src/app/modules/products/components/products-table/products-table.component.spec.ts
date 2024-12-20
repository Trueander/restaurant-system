import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTableComponent } from './products-table.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../shared/shared/shared.module";

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsTableComponent ],
      imports: [HttpClientModule, SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form product', () => {
    expect(component).toBeTruthy();
  });
});
