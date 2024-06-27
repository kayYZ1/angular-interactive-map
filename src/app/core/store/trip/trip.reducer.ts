import { createReducer, on } from '@ngrx/store';

import * as TripActions from './trip.actions';
import { ITrip, ITripDay } from '../../../shared/ts/interfaces';
import { addDaysToDate, generateId, getCurrentDate } from '../../../shared/utils';

const defaultTripDay: ITripDay[] = [{
  id: generateId(),
  objects: [],
  route: [],
  date: getCurrentDate(),
  distance: 0,
  time: 0,
}]

const initialState: ITrip = {
  name: "Moja wycieczka",
  days: defaultTripDay,
  activeTripDay: defaultTripDay[0]
};

export const tripReducer = createReducer(
  initialState,
  on(TripActions.setActiveTripDay, (state, { tripDay }) => ({
    ...state,
    activeTripDay: tripDay
  })),
  on(TripActions.addTripDay, (state) => ({
    ...state,
    days: [
      ...state.days,
      {
        id: generateId(),
        objects: [],
        route: [],
        date: addDaysToDate(state.days[state.days.length - 1].date),
        distance: 0,
        time: 0
      }
    ]
  })),
  on(TripActions.removeTripDay, (state, { id }) => ({
    ...state,
    days: state.days.filter((day) => day.id !== id)
  })),
  on(TripActions.addObjectToTripDay, (state, { object, tDay }) => {
    const tripDay = state.days.find(day => day.id === tDay.id);

    if (tripDay && !tripDay.objects.includes(object)) {
      const updatedTripDay = {
        ...tripDay,
        objects: [...tripDay.objects, object],
        route: [...tripDay.route, object.coordinates]
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

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(tripDay)] = updatedTripDay;

    return {
      ...state,
      days: updatedDays
    }
  }),
  on(TripActions.updateTripDayRoute, (state, { id, objects, route }) => {
    const tripDay = state.days.find(day => day.id === id);

    if (!tripDay) return state;

    const updatedTripDay = {
      ...tripDay,
      objects,
      route
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(tripDay)] = updatedTripDay;

    return {
      ...state,
      days: updatedDays
    }
  }),
  /*on(TripActions.recoverRoute, (state, { route }) => ({
    ...state,
    route: route
  })),*/
  on(TripActions.setSummary, (state, { id, distance, time }) => {
    const tripDay = state.days.find(day => day.id === id);

    if (!tripDay) return state;

    const updatedTripDay = {
      ...tripDay,
      distance,
      time
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(tripDay)] = updatedTripDay;

    return {
      ...state,
      days: updatedDays
    }
  }),
  on(TripActions.clearSummaries, (state, { id }) => {
    const tripDay = state.days.find(day => day.id === id);
    if (!tripDay) return state;

    const updatedTripDay = {
      ...tripDay,
      distance: 0,
      time: 0
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(tripDay)] = updatedTripDay;

    return {
      ...state,
      days: updatedDays
    }
  }),
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