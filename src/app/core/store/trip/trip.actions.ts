import { createAction, props } from '@ngrx/store';

import { IObject, ITripDay, ITrip } from '@/shared/ts/interfaces';

export const setTrip = createAction(
  '[Trip] Set trip',
  props<{ trip: ITrip }>()
);

export const setActiveTripDay = createAction(
  '[Trip] Set active trip day',
  props<{ tripDay: ITripDay }>()
);

export const addTripDay = createAction('[Trip] Add trip day');

export const removeTripDay = createAction(
  '[Trip] Remove trip day',
  props<{ id: number }>()
);

export const addObjectToTripDay = createAction(
  '[Trip] Add object to trip',
  props<{ object: IObject; id: number }>()
);

export const removeObjectFromTripDay = createAction(
  '[Trip] Remove object from trip',
  props<{ object: IObject; id: number }>()
);

export const updateTripDayRoute = createAction(
  '[Trip] Update route in trip',
  props<{ id: number; objects: IObject[]; route: [number, number][] }>()
);

export const recoverRoute = createAction(
  '[Trip] Recover trip route',
  props<{ route: [number, number][] }>()
);

export const setSummary = createAction(
  '[Trip] Set route summaries',
  props<{ id: number; distance: number; time: number }>()
);

export const clearSummaries = createAction(
  '[Trip] Clear route summaries',
  props<{ id: number }>()
);

export const setName = createAction(
  '[Trip] Set trip name',
  props<{ name: string }>()
);

export const setTripDate = createAction(
  '[Trip] Set trip date',
  props<{ date: string }>()
);
