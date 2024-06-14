import { createAction, props } from "@ngrx/store";
import { IObject } from "../../ts/interfaces";

export const addToTrip = createAction(
  'AddToTrip',
  props<{ object: IObject }>()
);

export const removeFromTrip = createAction(
  'RemoveFromTrip',
  props<{ object: IObject }>()
)

export const moveTrip = createAction(
  'MoveTrip',
  props<{ array: any, prev: number, curr: number }>()
)