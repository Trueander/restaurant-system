import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductsComponent } from './import-products.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../shared/shared/shared.module";

describe('ImportProductsComponent', () => {
  let component: ImportProductsComponent;
  let fixture: ComponentFixture<ImportProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportProductsComponent ],
      imports: [HttpClientModule, SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form imports', () => {
    expect(component).toBeTruthy();
  });
});
