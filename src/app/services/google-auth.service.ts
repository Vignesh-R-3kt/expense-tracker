import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private googleAuth: AngularFireAuth, private router: Router, private snakbar: SnackbarService) { }

  login() {
    this.googleAuth.signInWithPopup(new GoogleAuthProvider).then((res: any) => {
      localStorage.setItem('userInfo', JSON.stringify(res));
      this.router.navigate(['main-body']);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  logout() {
    this.googleAuth.signOut().then((res: any) => {
      localStorage.clear();
      this.router.navigate(['login']);
      this.snakbar.success('Successfully logged out')
    })
  }
}
