import { amounts, expense } from './../shared/interface';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private amounts: Subject<amounts> = new Subject<amounts>();
  private expenses: Subject<expense[]> = new Subject<expense[]>();

  private expensesData: expense[] = [];
  private amountsData: amounts = {
    income: 0,
    expense: 0,
    balance: 0
  };

  constructor(private api: ApiService) {
    this.api.fetchUserdata().subscribe((res: any) => {
      if (res) {
        if (res.amounts) {
          this.updateAmountValue(res.amounts);
        }
        if (res.expenses) {
          this.updateExpenseValue(res.expenses);
        }
      }
    })
  }

  setInitialValue() {
    this.amounts.next(this.amountsData);
    this.expenses.next(this.expensesData);
  }

  getAmountDetails() {
    return this.amounts as Observable<amounts>;
  }

  updateAmountValue(data: amounts) {
    const calculatedData: amounts = {
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense
    };
    this.amountsData = calculatedData;
    this.amounts.next(this.amountsData);
    this.updateDataToServer();
  }

  getExpensesDetails() {
    return this.expenses as Observable<expense[]>;
  }

  updateExpenseValue(expense: expense) {
    this.expensesData.push(expense);
    this.updateTotalAmount();
    this.expenses.next(this.expensesData);
    this.updateDataToServer();
  }

  updateTotalAmount() {
    const updatedAmount = { ...this.amountsData };
    let totalAmount: number = 0;
    this.expensesData.forEach((ele: any) => {
      totalAmount += ele.amount;
    });
    updatedAmount.expense = totalAmount;
    this.updateAmountValue(updatedAmount);
    this.updateDataToServer();
  }

  updateTotalExpenses(data: any) {
    this.expensesData = data;
    this.updateTotalAmount();
    this.expenses.next(this.expensesData);
    this.updateDataToServer();
  }


  updateDataToServer() {
    const payload = {
      amounts: this.amountsData,
      expenses: this.expensesData
    }

    this.api.sendUserData(payload).subscribe((res: any) => {
    })
  }

}
