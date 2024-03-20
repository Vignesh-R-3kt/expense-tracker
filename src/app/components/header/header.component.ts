import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo: any;
  greetings: any;
  time: any;

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    this.handleGreetings();
  }

  handleGreetings() {
    const time = new Date().getHours();
    if (time < 12) {
      this.greetings = "good morning";
      this.time = 0;
    } else if (time >= 12 && time < 16) {
      this.greetings = "good afternoon";
      this.time = 1;
    } else {
      this.greetings = "good evening";
      this.time = 2;
    }
  }
}
