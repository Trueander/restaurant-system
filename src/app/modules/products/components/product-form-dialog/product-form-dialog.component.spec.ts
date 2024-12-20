import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormDialogComponent } from './product-form-dialog.component';
import {CommonModule} from "@angular/common";
import {ProductsRoutingModule} from "../../products-routing.module";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ProductFormDialogComponent', () => {
  let component: ProductFormDialogComponent;
  let fixture: ComponentFixture<ProductFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFormDialogComponent ],
      imports: [
        CommonModule,
        ProductsRoutingModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form product-form', () => {
    expect(component).toBeTruthy();
  });
});
