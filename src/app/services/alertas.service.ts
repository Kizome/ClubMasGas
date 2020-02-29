import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  public confirmacion(title: any, text: any, icon: any, confirmButtonText: any, cancelButtonText: any) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

  public realizado(icon: any, title: any, timer: number) {

    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer
    })
  }
}
