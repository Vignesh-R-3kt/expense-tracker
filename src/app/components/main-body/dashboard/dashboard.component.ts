import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { amounts } from 'src/app/shared/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isIncomeEditable: boolean = false;
  @ViewChild('inputField', { static: false }) inputField: ElementRef;

  values: amounts = {
    income: 0,
    expense: 0,
    balance: 0
  }

  constructor(private calculation: CalculationService) { }

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

}
