import { createSelector, createFeatureSelector } from "@ngrx/store";

import { ITrip, ITripDay } from "@/shared/ts/interfaces";

export const selectTrip = createFeatureSelector<ITrip>('trip');

export const selectTripDays = createSelector(
  selectTrip,
  (state: ITrip) => state.days
);

export const selectActiveTripDay = createSelector(
  selectTrip,
  (state: ITrip) => state.activeTripDay
)

export const selectTripDay = (id: number) => createSelector(selectTripDays, (state: ITripDay[]) => {
  return state.find(day => day.id === id)!;
})

export const selectRoute = createSelector(
  selectTrip,
  (state: ITrip) => state.activeTripDay.route
);

