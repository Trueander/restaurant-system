import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeesComponent } from './list-employees.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesComponent ],
      imports: [HttpClientModule, SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form listemployee', () => {
    expect(component).toBeTruthy();
  });
});
