import { Component, Input, OnInit, inject } from '@angular/core';
import { SearchFilterPipe } from '../../../../../core/pipes/search-filter.pipe';
import { Categories } from '../../../../../core/ts/enums';
import { CriteriaFilterPipe } from '../../../../../core/pipes/criteria-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Store } from '@ngrx/store';
import { selectObjects } from '../../../../../core/store/objects';
import { AsyncPipe } from '@angular/common';
import { IObject } from '../../../../../core/ts/interfaces';
import { addToTrip, selectPlaces } from '../../../../../core/store/trip';

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

  objectList$ = this.store.select(selectObjects);
  places$ = this.store.select(selectPlaces);

  objects: IObject[] = [];
  places: IObject[] = [];
  page = 1;

  @Input() query!: string | null;
  @Input() criteria!: Categories[];

  ngOnInit(): void {
    this.objectList$.subscribe((data) => (this.objects = data));
    this.places$.subscribe((data) => (this.places = data));
  }

  onClick(object: IObject) {
    if (!this.places.includes(object)) {
      this.store.dispatch(addToTrip({ object }));
      console.log(object);
    }
  }
}
