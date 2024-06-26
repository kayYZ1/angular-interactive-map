import { createReducer, on } from '@ngrx/store';

import * as TripActions from './trip.actions';
import { ITrip, ITripDay } from '../../../shared/ts/interfaces';
import { addDaysToDate, generateId, getCurrentDate } from '../../../shared/utils';

const defaultTripDay: ITripDay[] = [{
  id: generateId(),
  objects: [],
  route: [],
  date: getCurrentDate(),
  totalDistance: 0,
  totalTime: 0,
}]

const initialState: ITrip = {
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
        objects: [],
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
  on(TripActions.addObjectToTripDay, (state, { object, id }) => {
    const tripDay = state.days.find(day => day.id === id);

    if (tripDay && !tripDay.objects.includes(object)) {
      const updatedTripDay = {
        ...tripDay,
        objects: [...tripDay.objects, object]
      }
      const updatedDays = [...state.days];
      updatedDays[updatedDays.indexOf(tripDay)] = updatedTripDay;

      return {
        ...state,
        days: updatedDays
      }
    }
    return state;
  }),
  on(TripActions.removeObjectFromTripDay, (state, { object, id }) => {
    const tripDay = state.days.find(day => day.id === id);

    if (!tripDay) return state;

    const updatedTripDay = {
      ...tripDay,
      objects: tripDay.objects.filter(o => o !== object),
      route: tripDay.route.filter(r => r !== object.coordinates)
    }

    return {
      ...state,
      days: [...state.days.filter(day => day.id !== id), updatedTripDay]
    }
  }),
  /*
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