import { createAction, props } from '@ngrx/store';
import { IObject } from '../../ts/interfaces';

export const addToTrip = createAction(
  'AddToTrip',
  props<{ object: IObject }>()
);

export const removeFromTrip = createAction(
  'RemoveFromTrip',
  props<{ object: IObject }>()
);

export const updateTripPlaces = createAction(
  '[Trip] Update places',
  props<{ places: IObject[] }>()
);
