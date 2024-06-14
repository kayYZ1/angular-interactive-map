import { createFeatureSelector } from "@ngrx/store";
import { FiltersState } from "./filters.reducer";

export const selectFilters = createFeatureSelector<FiltersState>('filters');