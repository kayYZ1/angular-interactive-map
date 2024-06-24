import { createReducer, on } from '@ngrx/store';
import { Categories } from '../../../shared/ts/enums';

import * as FilterActions from './filters.actions';

export interface FiltersState {
  searchQuery: string;
  criteria: Categories[];
}

const initialState: FiltersState = {
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
