import { amounts, expense } from './../../../shared/interface';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';


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
  yearsData: any[] = [];
  amount: amounts;
  expenses: any;
  dateRangeForm: FormGroup;
  monthData: any;

  constructor(private api: ApiService, private fb: FormBuilder, private loader: LoaderService) {
    this.dateRangeForm = fb.group({
      year: [''],
      month: ['']
    })
  }

  ngOnInit(): void {
    this.loader.show();
    this.updateDates();
    this.api.fetchUserdata(this.dateRangeForm.get('month')?.value, this.dateRangeForm.get('year')?.value).subscribe((res: any) => {
      this.monthData = res;
      if (this.monthData) {
        this.updateUserData(res);
        this.reInitializeTable();
        this.reinitializeChart();
      }
      setTimeout(() => {
        this.loader.hide();
      }, 1000)
    })
    this.dt0ptions = {
      pagingType: 'full_numbers',
    };
  }

  updateUserData(data: any) {
    this.amount = data.amounts;
    this.expenses = JSON.parse(data.expenses);
  }

  updateDates() {
    const date = new Date();
    this.dateRangeForm.get('year')?.setValue(date.getFullYear());
    this.dateRangeForm.get('month')?.setValue((date.getMonth() + 1).toString());

    for (let i = 2024; i <= Number(this.dateRangeForm.get('year')?.value); i++) {
      this.yearsData.push(i);
    }
  }

  updateChartData() {
    this.loader.show();
    const formValue = this.dateRangeForm.value;
    this.api.fetchUserdata(formValue.month, formValue.year).subscribe((res: any) => {
      this.monthData = res;
      if (this.monthData) {
        this.updateUserData(res);
        this.reInitializeTable();
        this.reinitializeChart();
      }
      setTimeout(() => {
        this.loader.hide();
      }, 1000)
    })
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
