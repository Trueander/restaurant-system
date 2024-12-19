import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCustomersTableComponent } from './top-customers-table.component';

describe('TopCustomersTableComponent', () => {
  let component: TopCustomersTableComponent;
  let fixture: ComponentFixture<TopCustomersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCustomersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCustomersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form topcustomer', () => {
    expect(component).toBeTruthy();
  });
});
