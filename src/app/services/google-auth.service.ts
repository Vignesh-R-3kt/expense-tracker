import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private googleAuth: AngularFireAuth, private router: Router) { }

  login() {
    this.googleAuth.signInWithPopup(new GoogleAuthProvider).then((res: any) => {
      sessionStorage.setItem('userInfo', JSON.stringify(res));
      this.router.navigate(['main-body']);
    }).catch((err: any) => {
      console.log(err);
    })
  }

  logout() {
    this.googleAuth.signOut().then((res: any) => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    })
  }
}
