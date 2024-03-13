import { GoogleAuthService } from './../../../services/google-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: any;
  profileImg: any;

  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '');
    this.userName = userInfo.additionalUserInfo.profile.name;
    this.profileImg = userInfo.additionalUserInfo.profile.picture;
  }

  logout() {
    this.googleAuth.logout();
  }
}
