import { Component, EventEmitter, inject, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveTripDay } from '../../../../../core/store/trip/trip.selectors';
import { IObject, ITripDay } from '../../../../../shared/ts/interfaces';
import { recoverRoute } from '../../../../../core/store/trip/trip.actions';
import { faTrash, faRoad, faSave, faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { clearSummaries, removeObjectFromTripDay } from '../../../../../core/store/trip/trip.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-trip-details',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar-trip-details.component.html',
  styleUrl: './sidebar-trip-details.component.css'
})
export class SidebarTripDetailsComponent implements OnInit {
  private readonly store = inject(Store);

  faTrash = faTrash;
  faCar = faCar;
  faRoad = faRoad;
  faReturn = faArrowLeft;
  faSave = faSave;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeTripDay$ = this.store.select(selectActiveTripDay);

  activeTripDay!: ITripDay;

  ngOnInit() {
    this.activeTripDay$.subscribe(data => this.activeTripDay = data);
    this.recoverTripRoute();
  }

  recoverTripRoute() {
    const route = [...this.activeTripDay.route];
    for (const object of this.activeTripDay.objects) {
      if (!route.includes(object.coordinates)) route.push(object.coordinates);
    }
    this.store.dispatch(recoverRoute({ route }))
  }

  onClick(object: IObject, id: number) {
    this.store.dispatch(removeObjectFromTripDay({ object, id }))
    if (this.activeTripDay.objects.length < 2) {
      this.store.dispatch(clearSummaries({ id: this.activeTripDay.id }))
    }
  }

  closeDetails(close: boolean) {
    this.close.emit(close)
  }
}
