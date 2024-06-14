import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ObjectState } from "./objects.reducer";

export const getObjectsState = createFeatureSelector<ObjectState>("objects");

export const selectObjects = createSelector(
  getObjectsState,
  (state: ObjectState) => state.objects
)

