import { amounts, expense } from './../../../shared/interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  currentYear: any;
  currentMonth: any;
  yearsData: any[] = [];
  amount: amounts;
  expenses: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateDates();
    this.api.fetchUserdata().subscribe((res: any) => {
      if (res) {
        this.updateUserData(res);
      }
    })
  }

  updateUserData(data: any) {
    this.amount = data.amounts;
    this.expenses = JSON.parse(data.expenses);
    console.log(this.amount, this.expenses);

  }

  updateDates() {
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = (date.getMonth() + 1).toString();

    for (let i = 2024; i <= this.currentYear; i++) {
      this.yearsData.push(i);
    }
  }
}
