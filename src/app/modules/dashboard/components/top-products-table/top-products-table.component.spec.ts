import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductsTableComponent } from './top-products-table.component';

describe('TopProductsTableComponent', () => {
  let component: TopProductsTableComponent;
  let fixture: ComponentFixture<TopProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form topproducts', () => {
    expect(component).toBeTruthy();
  });
});
