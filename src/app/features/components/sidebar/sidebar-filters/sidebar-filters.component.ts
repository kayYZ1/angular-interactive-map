import { Component, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Objects } from '../../../../core/data/objects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocation,
  faSearch,
  faList,
  faClose,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { Categories } from '../../../../core/ts/enums';
import { CriteriaFilterPipe } from '../../../../core/pipes/criteria-filter.pipe';
import { Store } from '@ngrx/store';
import { clearSearchQuery, removeFromCategory, setCategoryFilter, setSearchQueryFilter } from '../../../../core/store/filters/filters.actions';
import { selectFilters } from '../../../../core/store/filters/filters.selectors';
import { IFilters } from '../../../../core/ts/interfaces';

@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    CriteriaFilterPipe,
  ],
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.css',
})
export class SidebarFiltersComponent {
  private readonly store = inject(Store)

  filters$ = this.store.select(selectFilters);
  filters!: IFilters;

  searchPlaceholder = `${Objects.length} obiektów do zwiedzenia`;

  faLocationDot = faLocation;
  faSearch = faSearch;
  faList = faList;
  faClose = faClose;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  isCollapsed = true;

  categoriesList = Object.values(Categories);

  searchQuery = ''

  ngOnInit() {
    this.filters$.subscribe(data => this.filters = data);
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  onQueryChange() {
    this.store.dispatch(setSearchQueryFilter({ searchQuery: this.searchQuery }))
  }

  addCriteria(item: Categories) {
    if (!this.filters.criteria.includes(item)) {
      this.store.dispatch(setCategoryFilter({ searchCriteria: item }))
    } else {
      this.store.dispatch(removeFromCategory({ item }))
    }
  }

  resetQuery() {
    this.searchQuery = '';
    this.store.dispatch(clearSearchQuery());
  }
}
