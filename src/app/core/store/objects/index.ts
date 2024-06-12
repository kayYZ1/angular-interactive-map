import { IObject } from "../../ts/interfaces";
import { createFeatureSelector, createReducer, createSelector } from "@ngrx/store";
import { Objects } from "../../data/objects";

interface ObjectState {
  objects: IObject[];
  loading: boolean;
}

const initialState: ObjectState = {
  objects: Objects,
  loading: false
}

export const objectsReducer = createReducer(
  initialState,
)

export const getObjectsState = createFeatureSelector<ObjectState>("objects");

export const selectObjects = createSelector(
  getObjectsState,
  (state: ObjectState) => state.objects
)

