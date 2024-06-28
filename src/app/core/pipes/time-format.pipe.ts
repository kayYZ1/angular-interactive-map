import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'timeFormat',
  standalone: true,
  pure: false
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0 && value / 60 < 1) {
      return value + ' m';

    } else {
      return value / 60 + ' h';
    }
  }
}