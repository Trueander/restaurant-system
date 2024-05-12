import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Employee} from "../models/employee";
import {limpiarParametros} from "../../../shared/utils/http-utils";
import {RequestEmployee} from "../models/request-employee";
import {PaginationRequest} from "../../../shared/models/pagination-request";
import {PaginationResponse} from "../../../shared/models/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly baseUrlBackend: string = `${environment.URL_BACKEND}/api/employees`;

  constructor(private http: HttpClient) { }

  getEmployees(request: PaginationRequest): Observable<PaginationResponse<Employee>> {
    return this.http.get<PaginationResponse<Employee>>(this.baseUrlBackend, {params: limpiarParametros(request)})
               .pipe(
                 map(response => new PaginationResponse(response.totalElements, response.size, response.content))
               );
  }

  createEmployee(requestEmployee: RequestEmployee): Observable<void> {
    return this.http.post<void>(this.baseUrlBackend, requestEmployee);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrlBackend}/${employeeId}`);
  }

  updateEmployee(employeeId: number, requestEmployee: RequestEmployee): Observable<void> {
    return this.http.put<void>(`${this.baseUrlBackend}/${employeeId}`, requestEmployee);
  }
}
