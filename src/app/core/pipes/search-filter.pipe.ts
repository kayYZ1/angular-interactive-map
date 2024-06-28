import { Pipe, PipeTransform } from '@angular/core';

import { IObject } from '@/shared/ts/interfaces';

@Pipe({
  name: 'searchFilter',
  standalone: true,
  pure: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(array: IObject[], query: string | null) {
    query = query ? query.toLowerCase() : '';
    return query.length > 2
      ? array.filter(
        (data) =>
          data.title.toLowerCase().indexOf(query) > -1
      )
      : array;
  }
}