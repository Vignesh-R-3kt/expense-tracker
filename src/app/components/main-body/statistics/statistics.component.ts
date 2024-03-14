import { amounts, expense } from './../../../shared/interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  dt0ptions: DataTables.Settings = {
    pagingType: 'full_numbers',
  };

  highchartOptions: Highcharts.Options;

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
        this.reInitializeTable();
        this.reinitializeChart();
      }
    })
    this.dt0ptions = {
      pagingType: 'full_numbers',
    };
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

  updateChartData() {

  }

  reInitializeTable() {
    $('#stats-table').DataTable().destroy();
    setTimeout(() => {
      $('#stats-table').DataTable({
        pagingType: 'full_numbers',
        processing: true,
        destroy: true
      })
    }, 1);
  }

  calculateTotalExpense(category: string) {
    const filterItem = this.expenses.filter((ele: any) => { return ele.category === category });
    const totalAmount = filterItem.reduce((a: any, b: any) => { return a + b.amount }, 0);
    return totalAmount || 0;
  }

  reinitializeChart() {
    this.highchartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Expense Chart',
        align: 'center'
      },
      subtitle: {
        align: 'left'
      },
      xAxis: {
        title: {
          text: 'Category',
        },
        labels: {
          enabled: true
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount'
        },
        crosshair: false
      },
      tooltip: {
        valuePrefix: '₹ ',
        valueSuffix: '',
        headerFormat: ''
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          dataLabels: {
            enabled: true,
            // format: '<b>{point.name}</b>: {point.y}',
            formatter: function () {
              const value = this.y || 0;
              const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              return `<b>${this.point.name}</b>: ₹ ${formatted}`;
            }
          }
        }
      },
      series: [{
        name: 'Total Expenses: ',
        type: 'pie',
        data: [
          ['Food', this.calculateTotalExpense('food')],
          ['Travel', this.calculateTotalExpense('travel')],
          ['Shopping', this.calculateTotalExpense('shopping')],
          ['Grocery', this.calculateTotalExpense('grocery')],
          ['Movie', this.calculateTotalExpense('movie')],
          ['Others', this.calculateTotalExpense('others')]
        ]
      }],
      legend: {
        enabled: false
      },
      accessibility: {
        enabled: false
      },
    };
    Highcharts.chart('stats-container', this.highchartOptions);
  }
}
