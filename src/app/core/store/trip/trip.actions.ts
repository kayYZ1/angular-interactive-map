import { createAction, props } from "@ngrx/store";
import { IObject } from "../../ts/interfaces";

export const addToTrip = createAction(
  'AddToTrip',
  props<{ object: IObject }>()
);