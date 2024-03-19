import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapMonths'
})
export class MapMonthsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return months[value - 1];
  }

}
