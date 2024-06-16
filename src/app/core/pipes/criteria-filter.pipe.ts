import { Pipe, PipeTransform } from '@angular/core';
import { IObject } from '../ts/interfaces';
import { Categories } from '../ts/enums';

@Pipe({
  name: 'criteriaFilter',
  standalone: true,
  pure: false,
})
export class CriteriaFilterPipe implements PipeTransform {
  transform(objects: IObject[], criteria: Categories[]): IObject[] {
    if (!criteria || criteria.length === 0) {
      return objects;
    }
    return objects.filter((object) =>
      criteria.some((criterion) => object.category.includes(criterion))
    );
  }
}
