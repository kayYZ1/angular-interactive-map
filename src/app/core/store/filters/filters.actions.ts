import { createAction, props } from "@ngrx/store";

import { Categories } from "@/shared/ts/enums";

export const setSearchQueryFilter = createAction
  ('[Filters] Search Query',
    props<{ searchQuery: string }>()
  );

export const setCategoryFilter = createAction
  ('[Filters] Category Filter',
    props<{ searchCriteria: Categories }>()
  )

export const removeFromCategory = createAction(
  '[Filters] Remove from category',
  props<{ item: Categories }>()
)

export const clearSearchQuery = createAction(
  '[Filters] Clear Search Query',
)