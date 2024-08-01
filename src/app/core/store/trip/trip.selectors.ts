import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ITrip } from '@/shared/ts/interfaces';

export const selectTrip = createFeatureSelector<ITrip>('trip');

export const selectTripDays = createSelector(
  selectTrip,
  (state: ITrip) => state.days
);

export const selectActiveTripDay = createSelector(
  selectTrip,
  (state: ITrip) => state.activeTripDay
);

export const selectRoute = createSelector(
  selectTrip,
  (state: ITrip) => state.activeTripDay.route
);
