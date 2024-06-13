import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { CriteriaFilterPipe } from '../../../../core/pipes/criteria-filter.pipe';

@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SidebarListComponent,
    ReactiveFormsModule,
    CriteriaFilterPipe,
  ],
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.css',
})
export class SidebarFiltersComponent {
  searchPlaceholder = `${Objects.length} obiektów do zwiedzenia`;

  faLocationDot = faLocation;
  faSearch = faSearch;
  faList = faList;
  faClose = faClose;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  isCollapsed = true;

  categoriesList = Object.values(Categories);

  searchQuery = new FormControl('');
  searchCriteria: Categories[] = [];

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  addCriteria(item: Categories) {
    if (!this.searchCriteria.includes(item)) {
      this.searchCriteria.push(item);
    } else {
      const index = this.searchCriteria.indexOf(item);
      this.searchCriteria.splice(index, 1);
    }
  }

  resetQuery() {
    this.searchQuery.reset();
  }
}
