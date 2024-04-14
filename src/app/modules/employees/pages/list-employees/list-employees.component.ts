import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";
import {PaginationRequest} from "../../../../shared/models/pagination-request";
import {FormControl} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  Observable,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {SweetAlertService} from "../../../../shared/services/sweet-alert.service";

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit{
  employeeResponse$!: Observable<PaginationResponse<Employee>>;
  paginationRequest: PaginationRequest;
  columns: string[] = ['nombre', 'apellido', 'dni', 'celular', 'roles', 'acciones']
  employeesFilter: FormControl = new FormControl();
  paginationResponse: PaginationResponse<Employee>;

  constructor(private employeeService: EmployeeService,
              private sweetAlertService: SweetAlertService) {
    this.paginationRequest = new PaginationRequest(0, 2, '');
    this.paginationResponse = new PaginationResponse<Employee>(0,0,[]);
  }

  ngOnInit(): void {
    this.employeeResponse$ = this.employeesFilter.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        filter(value => value.length > 2 || value === ''),
        distinctUntilChanged(),
        switchMap(text => {
          this.paginationRequest.criteria = text;
          this.paginationRequest.page = 0;
          return this.getEmployees$();
        })
      );
  }

  onPageChange(pageEvent: PageEvent): void {
    this.paginationRequest.page = pageEvent.pageIndex;
    this.employeeResponse$ = this.getEmployees$();
  }

  getEmployees$(): Observable<PaginationResponse<Employee>> {
    return this.employeeService.getEmployees(this.paginationRequest)
      .pipe(
        tap(response => this.paginationResponse = response),
        catchError(() => {
          this.sweetAlertService.errorAlert("Ocurrió un error inesperado. Intente recargar la página");
          return EMPTY;
        })
      );
  }
}
