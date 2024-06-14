import { createSelector, createFeatureSelector } from "@ngrx/store";
import { TripState } from "./trip.reducer";

export const selectTrip = createFeatureSelector<TripState>('trip');

export const selectPlaces = createSelector(
  selectTrip,
  (state: TripState) => state.places
);

export const selectRoute = createSelector(
  selectTrip,
  (state: TripState) => state.route
);

