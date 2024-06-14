import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectPlaces } from '../../../../core/store/trip/trip.selectors';
import { IObject } from '../../../../core/ts/interfaces';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css',
})
export class SidebarTripComponent implements OnInit {
  private store = inject(Store);

  places$ = this.store.select(selectPlaces);
  places: IObject[] = [];

  currentDate = this.getCurrentDate();

  ngOnInit() {
    this.places$.subscribe((data) => (this.places = data));
  }

  getCurrentDate() {
    const today = new Date();
    let date = today.toJSON().slice(0, 10);
    let nDate = date.slice(8, 10) + '/'
      + date.slice(5, 7) + '/'
      + date.slice(0, 4);

    return nDate;
  }
}
