import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  success(message: string) {
    this.snackbar.open(message, 'Splash', {
      duration: 200000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'success-message'
    })
  }

  error(message: string) {
    this.snackbar.open(message, 'Splash', {
      duration: 200000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'error-message'
    })
  }
}
