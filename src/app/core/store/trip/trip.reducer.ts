import { createReducer, on } from '@ngrx/store';

import * as TripActions from './trip.actions';
import { IObject } from '../../ts/interfaces';

import { getCurrentDate } from '../../../shared/utilts';

export interface TripState {
  places: IObject[];
  route: [number, number][];
  date: string;
}

const initialState: TripState = {
  places: [],
  route: [],
  date: getCurrentDate(),
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
  }),
  on(TripActions.removeFromTrip, (state, { object }) => {
    state = {
      ...state,
      places: state.places.filter((item) => item !== object),
      route: state.route.filter((item) => item !== object.coordinates),
    };

    return state;
  }),
  on(TripActions.updateTrip, (state, { places, route }) => ({
    ...state,
    places: places,
    route: route,
  }))
);
