import { createAction, props } from '@ngrx/store';
import { IObject } from '../../../shared/ts/interfaces';

export const addTripDay = createAction(
  '[Trip] Add trip day',
)

export const removeTripDay = createAction(
  '[Trip] Remove trip day',
  props<{ id: number }>()
)

export const addToTrip = createAction(
  '[Trip] Add to trip',
  props<{ object: IObject }>()
);

export const removeFromTrip = createAction(
  '[Trip] Remove from trip',
  props<{ object: IObject }>()
);

export const updateTrip = createAction(
  '[Trip] Update places',
  props<{ places: IObject[]; route: [number, number][] }>()
);

export const recoverRoute = createAction(
  '[Trip] Recover trip route',
  props<{ route: [number, number][] }>()
)

export const setSummary = createAction(
  '[Trip] Set route summaries',
  props<{ distance: number, time: number }>()
)

export const clearSummaries = createAction(
  '[Trip] Clear route summaries',
)

export const setName = createAction(
  '[Trip] Set trip name',
  props<{ name: string }>()
)

export const setDate = createAction(
  '[Trip] Set date',
  props<{ id: number, date: string }>()
)
