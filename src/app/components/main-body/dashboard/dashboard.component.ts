import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { expense } from 'src/app/shared/interface';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todayDate: Date = new Date();
  isIncomeEditable: boolean = false;
  isExpenseEditable: boolean = false;
  incomeAmt: number = 0;
  expenseAmt: number = 0;
  balanceAmt: number = 0;
  isIncomeVisible: boolean = false;
  isBalanceVisible: boolean = false;

  @ViewChild('inputField', { static: false }) inputField: ElementRef;

  highchartOptions: Highcharts.Options;

  dt0ptions: DataTables.Settings = {
    pagingType: 'full_numbers',
  };


  expenses: expense[] = [];

  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private snackbar: SnackbarService, private dialog: MatDialog) {
    this.expenseForm = this.fb.group({
      date: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.api.fetchUserdata().subscribe((res: any) => {
      if (res) {
        this.incomeAmt = res.amounts.income;
        this.expenseAmt = res.amounts.expense;
        this.balanceAmt = res.amounts.balance;
        this.expenses = JSON.parse(res.expenses);
        this.updateCategoryData();
        this.reInitializeTable();
      }
    });

    this.dt0ptions = {
      pagingType: 'full_numbers',
      destroy: true
    };
  }

  reInitializeTable() {
    $('#expense-table').DataTable().destroy();
    setTimeout(() => {
      $('#expense-table').DataTable({
        pagingType: 'full_numbers',
        processing: true,
        destroy: true
      })
    }, 1);
  }

  enableEditMode() {
    this.isIncomeEditable = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0)
  }

  saveIncomeData() {
    this.isIncomeEditable = false;
    this.calculateAmountValues();
    this.snackbar.success('Income Saved Successfully');
  }

  fetchFormData() {
    const formValue: expense = this.expenseForm.value;
    const date = this.formatDate(formValue.date);
    formValue.date = date;
    this.expenseForm.reset();
    this.isExpenseEditable = false;
    this.expenses.unshift(formValue);
    this.calculateAmountValues();
    this.snackbar.success('New Expense Added Successfully');
    this.updateCategoryData();
    this.reInitializeTable();
  }

  formatDate(date: any) {
    const userDate = new Date(date);
    return `${userDate.getDate().toString().padStart(2, '0')}-${(userDate.getMonth() + 1).toString().padStart(2, '0')}-${userDate.getFullYear()} `;
  }

  deleteData(index: any) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      autoFocus: false,
    });

    deleteDialog.afterClosed().subscribe((res: any) => {
      if (res) {
        this.expenses.splice(index, 1);
        this.calculateAmountValues();
        this.snackbar.success('Expence Record Deleted Successfully');
        this.updateCategoryData();
        this.reInitializeTable();
      }
    })
  }

  calculateAmountValues() {
    const totalExpense = this.expenses.reduce((a: any, b: any) => { return a + b.amount }, 0);
    this.expenseAmt = totalExpense;
    this.balanceAmt = this.incomeAmt - totalExpense;
    this.updateDataToServer();
  }

  updateDataToServer() {
    const payload = {
      amounts: {
        income: this.incomeAmt,
        expense: this.expenseAmt,
        balance: this.balanceAmt
      },
      expenses: JSON.stringify(this.expenses)
    };

    this.api.sendUserData(payload).subscribe((res: any) => {

    })
  }

  getCategoryTotalValue(category: string) {
    const filterItem = this.expenses.filter(ele => ele.category === category);
    const totalAmount = filterItem.reduce((a: any, b: any) => { return a + b.amount }, 0);
    return totalAmount || 0;
  }

  updateCategoryData() {
    const graphData = [{
      type: 'column',
      name: 'Total Expense: ',
      data: [this.getCategoryTotalValue('food'), this.getCategoryTotalValue('travel'), this.getCategoryTotalValue('shopping'), this.getCategoryTotalValue('grocery'), this.getCategoryTotalValue('movie'), this.getCategoryTotalValue('others'),]
    }]
    this.reinitializeChart(graphData);
  }

  reinitializeChart(data: any) {
    this.highchartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Expense Chart',
        align: 'center'
      },
      subtitle: {
        align: 'left'
      },
      xAxis: {
        categories: ['Food', 'Travel', 'shopping', 'Grocery', 'Movie', 'Others'],
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
        column: {
          colorByPoint: true,
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function () {
              const value = this.y || 0;
              const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              return `₹ ${formatted}`;
            }
          }
        }
      },
      colors: [
        '#334D6C',
        '#DE686C',
        '#6A5676',
        '#E3A787',
        '#AF6272',
        '#7F934B'
      ],
      series: data,
      legend: {
        enabled: false
      },
      accessibility: {
        enabled: false
      },
    };
    Highcharts.chart('container', this.highchartOptions);
  }

}
