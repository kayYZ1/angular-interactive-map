import { createReducer, on } from '@ngrx/store';

import * as TripActions from './trip.actions';
import { IObject } from '../../ts/interfaces';

import { getCurrentDate } from '../../../shared/utilts';

export interface TripState {
  places: IObject[];
  route: [number, number][];
  date: string;
  totalDistance: number;
  totalTime: number;
}

const initialState: TripState = {
  places: [],
  route: [],
  date: getCurrentDate(),
  totalDistance: 0,
  totalTime: 0,
};

export const tripReducer = createReducer(
  initialState,
  on(TripActions.addToTrip, (state, { object }) => {
    if (!state.places.includes(object)) {
      return {
        ...state,
        places: [...state.places, object],
        route: [...state.route, object.coordinates],
      }
    }
    return state
  }),
  on(TripActions.removeFromTrip, (state, { object }) => ({
    ...state,
    places: state.places.filter((item) => item !== object),
    route: state.route.filter((item) => item !== object.coordinates)
  })),
  on(TripActions.updateTrip, (state, { places, route }) => ({
    ...state,
    places: places,
    route: route,
  })),
  on(TripActions.setSummary, (state, { distance, time }) => ({ ...state, totalDistance: distance, totalTime: time })),
  on(TripActions.clearSummaries, (state) => ({ ...state, totalDistance: 0, totalTime: 0 }))
);