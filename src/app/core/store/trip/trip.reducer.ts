import { createReducer, on } from "@ngrx/store";

import * as TripActions from "./trip.actions";
import { IObject } from "../../ts/interfaces";

export interface TripState {
  places: IObject[];
  route: [number, number][];
}

const initialState: TripState = {
  places: [],
  route: [],
};

export const tripReducer = createReducer(
  initialState,
  on(TripActions.addToTrip, (state, { object }) => {
    state = {
      ...state,
      places: [...state.places, object],
      route: [...state.route, object.coordinates],
    };

    return state;
  })
);