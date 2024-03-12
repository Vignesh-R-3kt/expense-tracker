import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculationService } from 'src/app/services/calculation.service';
import { amounts } from 'src/app/shared/interface';

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

  expenseForm: FormGroup;

  constructor(private calculation: CalculationService, private fb: FormBuilder) {
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
    const formValue = this.expenseForm.value;
    console.log(formValue);
    this.expenseForm.reset();
    this.isExpenseEditable = false;
  }

}
