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
export class DashboardComponent implements OnInit, AfterViewInit {



  todayDate: Date = new Date();
  isIncomeEditable: boolean = false;
  isExpenseEditable: boolean = false;
  incomeAmt: number = 0;
  expenseAmt: number = 0;
  balanceAmt: number = 0;

  @ViewChild('inputField', { static: false }) inputField: ElementRef;


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
      }
    })
  }

  ngAfterViewInit(): void {
    Highcharts.chart('container', this.options);
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
        this.snackbar.success('Expence Record Deleted Successfully')
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

  options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Hello world',
      align: 'center'
    },
    subtitle: {
      align: 'left'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
      crosshair: true,
      accessibility: {
        description: 'Months'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Balance'
      }
    },
    tooltip: {
      valueSuffix: ' (1000 MT)',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        type: 'column',
        name: 'Income',
        data: [406292, 260000, 107000, 68300, 27500, 14500]
      },
      {
        type: 'column',
        name: 'Expense',
        data: [51086, 136000, 5500, 141000, 107180, 77000]
      }
    ],

    accessibility: {
      enabled: false
    }
  };

}
