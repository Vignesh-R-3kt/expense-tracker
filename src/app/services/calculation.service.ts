import { amounts } from './../shared/interface';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private amounts: Subject<amounts> = new Subject<amounts>();

  setInitialValue() {
    this.amounts.next({
      income: 0,
      expense: 5000,
      balance: 0
    })
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

}
