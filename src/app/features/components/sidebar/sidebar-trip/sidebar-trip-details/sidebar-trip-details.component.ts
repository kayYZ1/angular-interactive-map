import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrip } from '../../../../../core/store/trip/trip.selectors';
import { IObject, ITrip } from '../../../../../core/ts/interfaces';
import { removeFromTrip } from '../../../../../core/store/trip/trip.actions';
import { faTrash, faRoad, faSave, faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { clearSummaries } from '../../../../../core/store/trip/trip.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-trip-details',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
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
  trip!: ITrip;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.trip$.subscribe(data => this.trip = data)
  }

  onClick(object: IObject) {
    this.store.dispatch(removeFromTrip({ object }))
    if (this.trip.places.length < 2) {
      this.store.dispatch(clearSummaries());
    }
  }

  closeDetails(close: boolean) {
    this.close.emit(close)
  }
}
