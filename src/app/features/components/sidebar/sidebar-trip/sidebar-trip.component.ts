import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectPlaces, selectTrip } from '../../../../core/store/trip/trip.selectors';
import { IObject, ITrip } from '../../../../core/ts/interfaces';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css',
})
export class SidebarTripComponent implements OnInit {
  private store = inject(Store);

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  ngOnInit() {
    this.trip$.subscribe((data) => (this.trip = data));
  }
}
