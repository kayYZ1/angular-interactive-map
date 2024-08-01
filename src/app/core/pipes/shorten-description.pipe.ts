import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDescription',
  standalone: true,
  pure: false,
})
export class ShortenDescriptionPipe implements PipeTransform {
  transform(description: string) {
    return description.length > 35
      ? description.substring(0, 35) + '...'
      : description;
  }
}
