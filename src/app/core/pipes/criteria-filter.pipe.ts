import { Pipe, PipeTransform } from '@angular/core';
import { IObject } from '../ts/interfaces';
import { Categories } from '../ts/enums';

@Pipe({
  name: 'criteriaFilter',
  standalone: true,
  pure: false
})
export class CriteriaFilterPipe implements PipeTransform {
  transform(array: IObject[], criteria: Categories[]) {
    return criteria.length === 0 ? array : array.filter(item => criteria.includes(item.category))
  }
}