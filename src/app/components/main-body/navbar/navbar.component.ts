import { GoogleAuthService } from './../../../services/google-auth.service';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userName: any;
  profileImg: any;
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(private googleAuth: GoogleAuthService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    this.userName = userInfo.additionalUserInfo.profile.name;
    this.profileImg = userInfo.additionalUserInfo.profile.picture;
  }

  handleMenu() {
    this.closeMenu.emit(false);
  }

  logout() {
    this.googleAuth.logout();
  }
}
