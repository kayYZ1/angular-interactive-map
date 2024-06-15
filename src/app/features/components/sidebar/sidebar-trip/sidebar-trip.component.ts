import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { selectTrip } from '../../../../core/store/trip/trip.selectors';
import { ITrip } from '../../../../core/ts/interfaces';
import { SidebarTripDetailsComponent } from './sidebar-trip-details/sidebar-trip-details.component';
import { updateTrip } from '../../../../core/store/trip/trip.actions';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [SidebarTripDetailsComponent, DragDropModule],
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

  drop(event: CdkDragDrop<string[]>) {
    const updatedPlaces = [...this.trip.places];
    const updatedRoute = [...this.trip.route];
    moveItemInArray(updatedPlaces, event.previousIndex, event.currentIndex);
    moveItemInArray(updatedRoute, event.previousIndex, event.currentIndex);
    this.store.dispatch(
      updateTrip({ places: updatedPlaces, route: updatedRoute })
    );
  }

  openDetails() {
    this.detailsClicked = true;
  }

  closeDetails() {
    this.detailsClicked = false;
  }
}
