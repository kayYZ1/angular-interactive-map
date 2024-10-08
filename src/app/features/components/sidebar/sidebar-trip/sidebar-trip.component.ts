import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { selectTrip } from '@/core/store/trip/trip.selectors';
import { ITrip, ITripDay } from '@/shared/ts/interfaces';
import { SidebarTripDetailsComponent } from './sidebar-trip-details/sidebar-trip-details.component';
import { addTripDay, removeTripDay, setActiveTripDay, setTripDate, updateTripDayRoute }
  from "@/core/store/trip/trip.actions";
import { getCurrentDate } from '@/shared/utils';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [SidebarTripDetailsComponent, DragDropModule, FontAwesomeModule, FormsModule, CommonModule],
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

  tripDate!: string;
  currentDate = getCurrentDate();

  ngOnInit() {
    this.trip$.subscribe(data => this.trip = data)
    this.tripDate = this.trip.days[0].date
  }

  addNewTripDay() {
    this.store.dispatch(addTripDay());
  }

  removeTripDay(id: number) {
    this.store.dispatch(removeTripDay({ id }));
  }

  drop(event: CdkDragDrop<string[]>, tripDay: ITripDay) {
    const updatedObjects = [...tripDay.objects];
    const updatedRoute = [...tripDay.route];
    moveItemInArray(updatedObjects, event.previousIndex, event.currentIndex);
    moveItemInArray(updatedRoute, event.previousIndex, event.currentIndex);
    this.store.dispatch(
      updateTripDayRoute({ id: tripDay.id, objects: updatedObjects, route: updatedRoute })
    );
  }

  handleDetails(tripDay: ITripDay | null) {
    if (tripDay) {
      this.store.dispatch(setActiveTripDay({ tripDay }))
    }
    this.detailsClicked = !this.detailsClicked
  }

  setDate(date: string) {
    this.store.dispatch(setTripDate({ date }))
  }
}
