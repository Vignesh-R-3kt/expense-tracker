import { Router } from '@angular/router';
import { GoogleAuthService } from './../../services/google-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userInfo: any;

  constructor(private googleAuth: GoogleAuthService, private router: Router) { }

  ngOnInit(): void {
    // localStorage.clear();
    const userStorageData = localStorage.getItem('userInfo');

    if (userStorageData) {
      this.userInfo = JSON.parse(userStorageData);
    } else {
      return;
    }

    this.userInfo.credential.accessToken && this.router.navigate(["/main-body"]);
  }

  login() {
    this.googleAuth.login();
  }

}
