import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmployeesComponent} from "./pages/list-employees/list-employees.component";
import {EmployeeFormComponent} from "./pages/employee-form/employee-form.component";

const routes: Routes = [
  {
    path: '',
    component: ListEmployeesComponent
  },
  {
    path: 'form',
    component: EmployeeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
