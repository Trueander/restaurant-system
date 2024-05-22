import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";


@NgModule({
  declarations: [
    ListEmployeesComponent,
    EmployeeFormComponent
  ],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        ReactiveFormsModule,
      SharedModule
    ]
})
export class EmployeesModule { }
