import { Component, Input, OnInit, inject } from '@angular/core';
import { SearchFilterPipe } from '../../../../core/pipes/search-filter.pipe';
import { CriteriaFilterPipe } from '../../../../core/pipes/criteria-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { IFilters, IObject } from '../../../../core/ts/interfaces';
import { addToTrip } from '../../../../core/store/trip/trip.actions';
import { selectPlaces } from '../../../../core/store/trip/trip.selectors';
import { selectFilters } from '../../../../core/store/filters/filters.selectors';
import { Objects } from '../../../../core/data/objects';

@Component({
  selector: 'app-sidebar-list',
  standalone: true,
  imports: [
    SearchFilterPipe,
    CriteriaFilterPipe,
    NgxPaginationModule,
    AsyncPipe,
  ],
  templateUrl: './sidebar-list.component.html',
  styleUrl: './sidebar-list.component.css',
})
export class SidebarListComponent implements OnInit {
  private readonly store = inject(Store);

  places$ = this.store.select(selectPlaces);
  filters$ = this.store.select(selectFilters);

  objects: IObject[] = Objects;
  places: IObject[] = [];
  filters!: IFilters;

  page = 1;

  ngOnInit(): void {
    this.places$.subscribe((data) => this.places = data);
    this.filters$.subscribe((data) => this.filters = data);
  }

  onClick(object: IObject) {
    if (!this.places.includes(object)) {
      this.store.dispatch(addToTrip({ object }));
    }
  }
}
