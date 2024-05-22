import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '') {
      return null;
    }

    const mobilePhonePattern = /^(9\d{8})$/;

    if (!mobilePhonePattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }

    return null;
};

export const isCheckBoxSelected: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const selectedOptions = control.value;
  return selectedOptions && selectedOptions.length > 0 ? null : { noCheckboxSelected: true };
}
