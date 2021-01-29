import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {
  transform(value: number): any {
    return `${Math.trunc(value / 60)}h${value % 60 || ''}`;
  }
}
