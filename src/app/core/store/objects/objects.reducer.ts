import { createReducer } from "@ngrx/store";

import { IObject } from "../../ts/interfaces";
import { Objects } from "../../data/objects";

export interface ObjectState {
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