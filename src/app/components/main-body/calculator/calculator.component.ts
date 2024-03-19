import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  result: string = '';

  constructor() { }

  addToCalculation(value: string) {
    this.result += value;
  }

  calculateResult(): void {
    try {
      const calculatedResult = eval(this.result);
      if (!isNaN(calculatedResult)) {
        this.result = calculatedResult.toString();
      } else {
        this.result = 'Error';
      }
    } catch (error) {
      this.result = 'Error';
    }
  }

  clearResult() {
    this.result = '';
  }

  clearOneDigit() {
    this.result = this.result.slice(0, -1);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    if (!isNaN(parseInt(key))) {
      this.addToCalculation(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
      this.addToCalculation(key);
    } else if (key === 'Enter') {
      this.calculateResult();
    } else if (key === 'C' || key === 'c') {
      this.clearResult();
    } else if (key === 'Backspace') {
      this.clearOneDigit();
    }
  }
}
