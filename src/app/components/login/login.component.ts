import { GoogleAuthService } from './../../services/google-auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private googleAuth: GoogleAuthService) { }

  login() {
    this.googleAuth.login();
  }

}
