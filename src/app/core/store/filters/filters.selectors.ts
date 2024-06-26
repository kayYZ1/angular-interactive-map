import { createFeatureSelector } from "@ngrx/store";
import { IFilters } from "../../../shared/ts/interfaces";

export const selectFilters = createFeatureSelector<IFilters>('filters');