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

export const updateTrip = createAction(
  '[Trip] Update places',
  props<{ places: IObject[]; route: [number, number][] }>()
);

export const setSummary = createAction(
  '[Trip] Set route summaries',
  props<{ distance: number, time: number }>()
)

export const clearSummaries = createAction(
  '[Trip] Clear route summaries',
)
