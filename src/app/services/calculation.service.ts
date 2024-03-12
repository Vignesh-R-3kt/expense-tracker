import { amounts, expense } from './../shared/interface';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private amounts: Subject<amounts> = new Subject<amounts>();
  private expenses: Subject<expense[]> = new Subject<expense[]>();

  private expensesData: expense[] = [];

  setInitialValue() {
    this.amounts.next({
      income: 0,
      expense: 5000,
      balance: 0
    });

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
    this.amounts.next(calculatedData);
  }

  getExpensesDetails() {
    return this.expenses as Observable<expense[]>;
  }

  updateExpenseValue(expense: expense) {
    this.expensesData.push(expense);
    this.expenses.next(this.expensesData);
  }

}
