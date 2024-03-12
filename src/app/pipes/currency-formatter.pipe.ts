import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter',
  pure: true
})
export class CurrencyFormatterPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const amount = value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `₹ ${amount || 0}`;
  }

}
