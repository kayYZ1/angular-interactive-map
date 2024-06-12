import {
  createAction,
  createReducer,
  props,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IObject } from '../../ts/interfaces';

interface TripState {
  places: IObject[];
  route: [number, number][];
}

const initialState: TripState = {
  places: [],
  route: [],
};

export const addToTrip = createAction(
  'AddToTrip',
  props<{ object: IObject }>()
);

export const tripReducer = createReducer(
  initialState,
  on(addToTrip, (state, { object }) => {
    state = {
      ...state,
      places: [...state.places, object],
      route: [...state.route, object.coordinates],
    };

    return state;
  })
);

const selectTrip = createFeatureSelector<TripState>('trip');

export const selectPlaces = createSelector(
  selectTrip,
  (state: TripState) => state.places
);

export const selectRoute = createSelector(
  selectTrip,
  (state: TripState) => state.route
);
