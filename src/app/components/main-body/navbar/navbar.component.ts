import { GoogleAuthService } from './../../../services/google-auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private googleAuth: GoogleAuthService) { }

  logout() {
    this.googleAuth.logout();
  }
}
