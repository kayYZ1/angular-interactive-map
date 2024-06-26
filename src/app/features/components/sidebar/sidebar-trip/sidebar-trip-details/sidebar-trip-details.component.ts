import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrip } from '../../../../../core/store/trip/trip.selectors';
import { IObject, ITripDay } from '../../../../../shared/ts/interfaces';
import { removeFromTrip } from '../../../../../core/store/trip/trip.actions';
import { faTrash, faRoad, faSave, faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { clearSummaries } from '../../../../../core/store/trip/trip.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { updateTrip, setDate } from '../../../../../core/store/trip/trip.actions';
import { getCurrentDate } from '../../../../../shared/utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-trip-details',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, DragDropModule],
  templateUrl: './sidebar-trip-details.component.html',
  styleUrl: './sidebar-trip-details.component.css'
})
export class SidebarTripDetailsComponent {
  private readonly store = inject(Store);

  faTrash = faTrash;
  faCar = faCar;
  faRoad = faRoad;
  faReturn = faArrowLeft;
  faSave = faSave;

  trip$ = this.store.select(selectTrip);
  trip!: ITripDay;

  @Input() tripDayDetails!: ITripDay;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClick(object: IObject) {
    this.store.dispatch(removeFromTrip({ object }))
    if (this.trip.places.length < 2) {
      this.store.dispatch(clearSummaries());
    }
  }

  closeDetails(close: boolean) {
    this.close.emit(close)
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
}
