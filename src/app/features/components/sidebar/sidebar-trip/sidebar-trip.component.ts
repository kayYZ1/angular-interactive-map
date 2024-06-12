import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTripPlaces } from '../../../../core/store/trip';
import { IObject } from '../../../../core/ts/interfaces';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css'
})
export class SidebarTripComponent implements OnInit {
  private store = inject(Store)

  places$ = this.store.select(selectTripPlaces);
  places: IObject[] = [];

  ngOnInit(): void {
    this.places$.subscribe(data => this.places = data);
  }
}
