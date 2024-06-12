import { createAction, createReducer, props, on, createFeatureSelector, createSelector } from "@ngrx/store";
import { IObject } from "../../ts/interfaces";

interface TripState {
  places: IObject[],
  road: [number, number][]
}

const initialState: TripState = {
  places: [],
  road: []
}

export const addToTrip = createAction('AddToTrip',
  props<{ object: IObject }>()
);

export const tripReducer = createReducer(
  initialState,
  on(addToTrip, (state, { object }) => {
    state = {
      ...state,
      places: [...state.places, object],
      road: [...state.road, object.coordinates]
    }

    return state;
  })
)

const getTripState = createFeatureSelector<TripState>("trip");

export const selectTripPlaces = createSelector(
  getTripState,
  (state: TripState) => state.places
)

export const selectTripRoad = createSelector(
  getTripState,
  (state: TripState) => state.road
)
