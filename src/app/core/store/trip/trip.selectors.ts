import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ITrip } from "../../../shared/ts/interfaces";

export const selectTrip = createFeatureSelector<ITrip>('trip');

export const selectTripDays = createSelector(
  selectTrip,
  (state: ITrip) => state.days
);

export const selectRoute = createSelector(
  selectTrip,
  (state: ITrip) => state.days[0].route
);

