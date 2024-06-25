import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { Categories } from '../../../../shared/ts/enums';
import { CriteriaFilterPipe } from '../../../../core/pipes/criteria-filter.pipe';
import { Store } from '@ngrx/store';
import { clearSearchQuery, setCategoryFilter, setSearchQueryFilter } from '../../../../core/store/filters/filters.actions';
import { selectFilters } from '../../../../core/store/filters/filters.selectors';
import { IFilters, IObject } from '../../../../shared/ts/interfaces';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { SidebarObjectInfoComponent } from '../sidebar-object-info/sidebar-object-info.component';
import { selectRoute } from '../../../../core/store/trip/trip.selectors';

@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    CriteriaFilterPipe,
    SidebarListComponent,
    SidebarObjectInfoComponent,
  ],
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.css',
})
export class SidebarFiltersComponent {
  private readonly store = inject(Store)

  filters$ = this.store.select(selectFilters);
  route$ = this.store.select(selectRoute);

  filters!: IFilters;
  route!: [number, number][];

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

  objectInfo = false;
  object!: IObject;

  ngOnInit() {
    this.filters$.subscribe(data => this.filters = data);
    this.route$.subscribe(data => this.route = data);
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  onQueryChange(searchQuery: string) {
    this.store.dispatch(setSearchQueryFilter({ searchQuery }))
  }

  addCriteria(item: Categories) {
    this.store.dispatch(setCategoryFilter({ searchCriteria: item }))
  }

  resetQuery() {
    this.searchQuery = '';
    this.store.dispatch(clearSearchQuery());
  }

  openObjectInfo(object: IObject) {
    this.objectInfo = true;
    this.object = object;
  }

  closeObjectInfo() {
    this.objectInfo = false;
  }
}
