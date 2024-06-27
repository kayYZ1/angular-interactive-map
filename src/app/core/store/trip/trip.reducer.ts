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
  on(TripActions.addObjectToTripDay, (state, { object }) => {
    const updatedTd = {
      ...state.activeTripDay,
      objects: [...state.activeTripDay.objects, object],
      route: [...state.activeTripDay.route, object.coordinates]
    }

    const updatedDays = [...state.days]
    updatedDays[updatedDays.indexOf(state.activeTripDay)] = updatedTd;
    return {
      ...state,
      days: updatedDays,
      activeTripDay: updatedTd
    }
  }),
  on(TripActions.removeObjectFromTripDay, (state, { object }) => {
    const updatedTd = {
      ...state.activeTripDay,
      objects: state.activeTripDay.objects.filter(o => o !== object),
      route: state.activeTripDay.route.filter(r => r !== object.coordinates)
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(state.activeTripDay)] = updatedTd;
    return {
      ...state,
      days: updatedDays,
      activeTripDay: updatedTd
    }
  }),
  on(TripActions.updateTripDayRoute, (state, { objects, route }) => {
    const updatedTd = {
      ...state.activeTripDay,
      objects,
      route
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(state.activeTripDay)] = updatedTd;
    return {
      ...state,
      days: updatedDays,
      activeTripDay: updatedTd
    }
  }),
  on(TripActions.recoverRoute, (state, { route }) => {
    const updatedTd = {
      ...state.activeTripDay,
      route
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(state.activeTripDay)] = updatedTd;
    return {
      ...state,
      days: updatedDays,
      activeTripDay: updatedTd
    }
  }),
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
  on(TripActions.clearSummaries, (state) => {
    const updatedTd = {
      ...state.activeTripDay,
      distance: 0,
      time: 0
    }

    const updatedDays = [...state.days];
    updatedDays[updatedDays.indexOf(state.activeTripDay)] = updatedTd;
    return {
      ...state,
      days: updatedDays,
      activeTripDay: updatedTd
    }
  }),
  on(TripActions.setName, (state, { name }) => ({
    ...state,
    name: name.length > 3 ? name : state.name
  }))
);