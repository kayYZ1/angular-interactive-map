import { createReducer, on } from '@ngrx/store';

import * as FilterActions from "@/core/store/filters/filters.actions"
import { IFilters } from '@/shared/ts/interfaces';

const initialState: IFilters = {
  searchQuery: '',
  criteria: [],
};

export const filtersReducer = createReducer(
  initialState,
  on(FilterActions.setSearchQueryFilter, (state, { searchQuery }) => ({
    ...state,
    searchQuery,
  })),
  on(FilterActions.setCategoryFilter, (state, { searchCriteria }) => {
    if (!state.criteria.includes(searchCriteria)) {
      return {
        ...state,
        criteria: [...state.criteria, searchCriteria],
      }
    }
    return {
      ...state,
      criteria: state.criteria.filter((item) => item !== searchCriteria),
    }
  }),
  on(FilterActions.clearSearchQuery, (state) => ({ ...state, searchQuery: '' }))
);
