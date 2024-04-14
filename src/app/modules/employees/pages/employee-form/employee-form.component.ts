import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SweetAlertService} from "../../../../shared/services/sweet-alert.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {isCheckBoxSelected, phoneNumberValidator} from "../../../../shared/utils/custom-validation-utils";
import {RoleService} from "../../../../shared/services/role.service";
import {Role} from "../../../../shared/models/role";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{
  employeeForm!: FormGroup;
  unsubscribe$: Subject<void>;
  roles$!: Observable<Role[]>;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private sweetAlertService: SweetAlertService,
              public roleService: RoleService) {
    this.initForm();
    this.unsubscribe$ = new Subject<void>;
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.getRoles();
  }

  private initForm(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      lastname: new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      dni: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
      phoneNumber: new FormControl(null, [Validators.minLength(9), Validators.maxLength(9), phoneNumberValidator]),
      roleIds: new FormArray([], [Validators.required, isCheckBoxSelected])
    });
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

  createEmployee(): void {
    if(this.employeeForm.valid) {
      this.getEmployeeFormControl('password').setValue(this.getEmployeeFormControl('dni').value);
      this.employeeService.createEmployee(this.employeeForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          complete: () => {
            this.sweetAlertService.successAlert("Colaborador registrado con éxito");
            this.router.navigate(['/employees']);
          },
          error: error => {
            console.log(error)
            if(error.error && error.error.message) {
              this.sweetAlertService.errorAlert(error.error.message);
            }
          }
        });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  getEmployeeFormControl(name: string): FormControl {
    return this.employeeForm.get(name) as FormControl;
  }

  getRolesIdsFormArray(): FormArray {
    return this.employeeForm.get('roleIds') as FormArray;
  }
}
