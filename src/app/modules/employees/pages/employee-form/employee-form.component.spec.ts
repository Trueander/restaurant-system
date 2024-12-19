import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {SharedModule} from "../../../../shared/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock params
            queryParams: of({}), // Mock queryParams (if used)
            snapshot: { paramMap: { get: () => '123' } } // Mock snapshot (if used)
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should employee-form', () => {
    expect(component).toBeTruthy();
  });
});
