import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CalculationService } from 'src/app/services/calculation.service';
import { amounts, expense } from 'src/app/shared/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todayDate: Date = new Date();
  isIncomeEditable: boolean = false;
  isExpenseEditable: boolean = false;

  @ViewChild('inputField', { static: false }) inputField: ElementRef;

  values: amounts = {
    income: 0,
    expense: 0,
    balance: 0
  }

  expenses: expense[] = [];

  expenseForm: FormGroup;

  constructor(private calculation: CalculationService, private fb: FormBuilder, private api: ApiService) {
    this.expenseForm = this.fb.group({
      date: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.calculation.getAmountDetails().subscribe((res: amounts) => {
      this.values = res;
    });
    this.calculation.getExpensesDetails().subscribe((res: expense[]) => {
      this.expenses = res.reverse();
    })
    this.calculation.setInitialValue();
  }

  enableEditMode() {
    this.isIncomeEditable = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0)
  }

  saveIncomeData() {
    this.isIncomeEditable = false;
    this.calculation.updateAmountValue(this.values);
  }

  fetchFormData() {
    const formValue: expense = this.expenseForm.value;
    const date = this.formatDate(formValue.date);
    formValue.date = date;
    this.expenseForm.reset();
    this.isExpenseEditable = false;
    this.calculation.updateExpenseValue(formValue);
  }

  formatDate(date: any) {
    const userDate = new Date(date);
    return `${userDate.getDate().toString().padStart(2, '0')}-${(userDate.getMonth() + 1).toString().padStart(2, '0')}-${userDate.getFullYear()} `;
  }

  deleteData(index: any) {
    this.expenses.splice(index, 1);
    this.calculation.updateTotalExpenses(this.expenses);
  }

}
