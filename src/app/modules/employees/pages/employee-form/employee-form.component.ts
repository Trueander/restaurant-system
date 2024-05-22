import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SweetAlertService} from "../../../../shared/services/sweet-alert.service";
import {catchError, EMPTY, filter, map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {isCheckBoxSelected, phoneNumberValidator} from "../../../../shared/utils/custom-validation-utils";
import {RoleService} from "../../../../shared/services/role.service";
import {Role} from "../../../../shared/models/role";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  employeeForm!: FormGroup;
  unsubscribe$: Subject<void>;
  roles$!: Observable<Role[]>;
  employeeId!: number;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private sweetAlertService: SweetAlertService,
              private roleService: RoleService,
              private route: ActivatedRoute) {
    this.initForm();
    this.unsubscribe$ = new Subject<void>;
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.getRoles();
    this.cargarColaborador();
  }

  private initForm(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      lastname: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      dni: new FormControl(null, [Validators.required, Validators.minLength(8),
        Validators.maxLength(8), Validators.pattern("^[0-9]*")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.minLength(9), Validators.maxLength(9), phoneNumberValidator]),
      roleIds: new FormArray([], [Validators.required, isCheckBoxSelected])
    });
  }

  private cargarColaborador(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => +params['employeeId']),
        filter(employeeId => !!employeeId),
        switchMap(employeeId => this.employeeService.getEmployeeById(employeeId)),
        tap(employee => this.setEmployeeValuesForm(employee)),
        catchError(error => {
          this.router.navigate(['/employees']);
          return this.showError(error);
        })
      ).subscribe();
  }

  private setEmployeeValuesForm(employee: Employee): void {
    this.employeeId = employee.id;
    this.employeeForm.patchValue(employee);
    employee.roles.forEach(role => this.getRolesIdsFormArray().push(new FormControl(role.id)));
  }

  agregarRolColaborador(roleId: number): void {
    let found = false;
    for (let i = 0; i < this.getRolesIdsFormArray().length; i++) {
      if (this.getRolesIdsFormArray().at(i).value === roleId) {
        this.getRolesIdsFormArray().removeAt(i);
        found = true;
        break;
      }
    }

    if (!found) {
      this.getRolesIdsFormArray().push(new FormControl(roleId));
    }
  }

  updateEmployee(): void {
    if(this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError(error => this.showError(error)),
        ).subscribe(() => {
        this.sweetAlertService.successAlert("Colaborador actualizado con éxito");
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  createEmployee(): void {
    if(this.employeeForm.valid) {
      this.employeeService.createEmployee(this.employeeForm.value)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError(error => this.showError(error))
        )
        .subscribe(() => {
          this.sweetAlertService.successAlert("Colaborador registrado con éxito");
          this.router.navigate(['/employees']);
        });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  private showError(error: any) : Observable<never> {
    if(error.error && error.error.message) {
      this.sweetAlertService.errorAlert(error.error.message);
    }
    return EMPTY;
  }

  getEmployeeFormControl(name: string): FormControl {
    return this.employeeForm.get(name) as FormControl;
  }

  getRolesIdsFormArray(): FormArray {
    return this.employeeForm.get('roleIds') as FormArray;
  }

  getRolesIds(): number[] {
    return this.getRolesIdsFormArray().value;
  }
}
