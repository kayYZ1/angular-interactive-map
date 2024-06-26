import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { SearchFilterPipe } from '../../../../../core/pipes/search-filter.pipe';
import { CriteriaFilterPipe } from '../../../../../core/pipes/criteria-filter.pipe';
import { IFilters, IObject } from '../../../../../shared/ts/interfaces';
import { selectFilters } from '../../../../../core/store/filters/filters.selectors';
import { Objects } from '../../../../../core/data/objects';
import { ShortenDescriptionPipe } from '../../../../../core/pipes/shorten-description.pipe';

@Component({
  selector: 'app-sidebar-list',
  standalone: true,
  imports: [
    SearchFilterPipe,
    CriteriaFilterPipe,
    ShortenDescriptionPipe,
    NgxPaginationModule,
  ],
  templateUrl: './sidebar-list.component.html',
  styleUrl: './sidebar-list.component.css',
})
export class SidebarListComponent implements OnInit {
  private readonly store = inject(Store);

  filters$ = this.store.select(selectFilters);

  objects: IObject[] = Objects;
  places: IObject[] = [];
  filters!: IFilters;

  page = 1;

  @Output() showObjectInfo: EventEmitter<IObject> = new EventEmitter();

  ngOnInit(): void {
    this.filters$.subscribe((data) => (this.filters = data));
  }

  onClick(object: IObject) {
    this.showObjectInfo.emit(object);
  }
}
