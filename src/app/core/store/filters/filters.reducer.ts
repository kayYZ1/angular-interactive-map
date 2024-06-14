import { createReducer, on } from "@ngrx/store";
import { Categories } from "../../ts/enums";

import * as FilterActions from "./filters.actions"

export interface FiltersState {
  searchQuery: string;
  criteria: Categories[];
}

const initialState: FiltersState = {
  searchQuery: '',
  criteria: []
}

export const filtersReducer = createReducer(
  initialState,
  on(FilterActions.setSearchQueryFilter, (state, { searchQuery }) => ({ ...state, searchQuery })),
  on(FilterActions.setCategoryFilter, (state, action) => ({ ...state, criteria: [...state.criteria, action.searchCriteria] })),
  on(FilterActions.removeFromCategory, (state, action) =>
    ({ ...state, criteria: state.criteria.filter(item => item !== action.item) })),
  on(FilterActions.clearSearchQuery, (state) => ({ ...state, searchQuery: '' }))
)

