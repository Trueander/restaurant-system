import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockComponent } from './update-stock.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('UpdateStockComponent', () => {
  let component: UpdateStockComponent;
  let fixture: ComponentFixture<UpdateStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStockComponent ],
      imports: [HttpClientModule, SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form updatestock', () => {
    expect(component).toBeTruthy();
  });
});
