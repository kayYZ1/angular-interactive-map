import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { selectTrip } from '../../../../core/store/trip/trip.selectors';
import { ITrip, ITripDay } from '../../../../shared/ts/interfaces';
import { SidebarTripDetailsComponent } from './sidebar-trip-details/sidebar-trip-details.component';
import { addTripDay, recoverRoute, removeTripDay, setDate, updateTrip } from '../../../../core/store/trip/trip.actions';
import { getCurrentDate } from '../../../../shared/utils';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [SidebarTripDetailsComponent, DragDropModule, FontAwesomeModule, FormsModule],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css',
})
export class SidebarTripComponent implements OnInit {
  private store = inject(Store);

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  faPlus = faPlus;
  faTrash = faTrash;

  detailsClicked: boolean = false;
  tripDayDetails!: ITripDay;

  tripDate = "";
  currentDate = getCurrentDate();

  ngOnInit() {
    this.trip$.subscribe(data => this.trip = data)
    this.recoverTripRoute();
  }

  addNewTripDay(tripDay: ITripDay) {
    this.store.dispatch(addTripDay({ tripDay }));
  }

  removeTripDay(id: number) {
    this.store.dispatch(removeTripDay({ id }));
  }

  recoverTripRoute() {
    const route = [...this.trip.days[0].route];
    for (const object of this.trip.days[0].objects) {
      if (!route.includes(object.coordinates)) route.push(object.coordinates);
    }
    this.store.dispatch(recoverRoute({ route }))
  }

  drop(event: CdkDragDrop<string[]>) {
    const updatedPlaces = [...this.trip.days[0].objects];
    const updatedRoute = [...this.trip.days[0].route];
    moveItemInArray(updatedPlaces, event.previousIndex, event.currentIndex);
    moveItemInArray(updatedRoute, event.previousIndex, event.currentIndex);
    this.store.dispatch(
      updateTrip({ places: updatedPlaces, route: updatedRoute })
    );
  }

  handleDetails(tripDayDetails: ITripDay | null) {
    if (tripDayDetails) {
      this.tripDayDetails = tripDayDetails;
    }
    this.detailsClicked = !this.detailsClicked;
  }

  setTripDate(date: string) {
    this.store.dispatch(setDate({ date, id: this.tripDayDetails.id }))
  }
}
