import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  successAlert(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      text: message,
      timerProgressBar: true,
      icon: 'success'
    })
  }

  infoAlert(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      text: message,
      timerProgressBar: true,
      icon: 'info'
    })
  }

  warningAlert(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      text: message,
      timerProgressBar: true,
      icon: 'warning'
    })
  }

  errorAlert(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      text: message,
      timerProgressBar: true,
      icon: 'error'
    })
  }
}
