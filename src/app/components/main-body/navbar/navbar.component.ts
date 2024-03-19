import { GoogleAuthService } from './../../../services/google-auth.service';
import { Component, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userName: any;
  profileImg: any;
  isHamberger: boolean = false;

  constructor(private googleAuth: GoogleAuthService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '');
    this.userName = userInfo.additionalUserInfo.profile.name;
    this.profileImg = userInfo.additionalUserInfo.profile.picture;
  }

  logout() {
    this.googleAuth.logout();
  }

  openMenu() {
    this.isHamberger = !this.isHamberger;
    this.isHamberger = true;
  }

  closeMenu() {
    this.isHamberger = false
    this.isHamberger = this.isHamberger;
  }
}
