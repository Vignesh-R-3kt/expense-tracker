import { GoogleAuthService } from './../../services/google-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
    this.googleAuth.login();
  }

}
