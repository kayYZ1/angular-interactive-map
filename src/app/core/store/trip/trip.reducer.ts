import { createReducer, on } from '@ngrx/store';

import * as TripActions from './trip.actions';
import { ITripDay } from '../../../shared/ts/interfaces';
import { addDaysToDate, generateId, getCurrentDate } from '../../../shared/utils';

export interface TripState {
  name: string;
  days: ITripDay[];
}

const defaultTripDay: ITripDay[] = [{
  id: generateId(),
  places: [],
  route: [],
  date: getCurrentDate(),
  totalDistance: 0,
  totalTime: 0,
}]

const initialState: TripState = {
  name: "Moja wycieczka",
  days: defaultTripDay
};

export const tripReducer = createReducer(
  initialState,
  on(TripActions.addTripDay, (state) => ({
    ...state,
    days: [
      ...state.days,
      {
        id: generateId(),
        places: [],
        route: [],
        date: addDaysToDate(state.days[state.days.length - 1].date),
        totalDistance: 0,
        totalTime: 0
      }
    ]
  })),
  on(TripActions.removeTripDay, (state, { id }) => ({
    ...state,
    days: state.days.filter((day) => day.id !== id)
  })),
  /* on(TripActions.addToTrip, (state, { object }) => {
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
   })),*/
  on(TripActions.recoverRoute, (state, { route }) => ({
    ...state,
    route: route
  })),
  on(TripActions.setSummary, (state, { distance, time }) => ({ ...state, totalDistance: distance, totalTime: time })),
  on(TripActions.clearSummaries, (state) => ({ ...state, totalDistance: 0, totalTime: 0 })),
  on(TripActions.setName, (state, { name }) => {
    if (name.length > 3) {
      return {
        ...state,
        name
      }
    }
    return state
  }),
);