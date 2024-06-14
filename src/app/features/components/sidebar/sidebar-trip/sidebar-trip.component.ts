import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectTrip } from '../../../../core/store/trip/trip.selectors';
import { ITrip } from '../../../../core/ts/interfaces';
import { SidebarTripDetailsComponent } from './sidebar-trip-details/sidebar-trip-details.component';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [SidebarTripDetailsComponent],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css',
})
export class SidebarTripComponent implements OnInit {
  private store = inject(Store);

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  detailsClicked: boolean = false;

  ngOnInit() {
    this.trip$.subscribe((data) => (this.trip = data));
  }

  onClick() {
    this.detailsClicked = !this.detailsClicked;
  }
}
