import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrip } from '../../../../../core/store/trip/trip.selectors';
import { IObject, ITrip } from '../../../../../core/ts/interfaces';
import { removeFromTrip } from '../../../../../core/store/trip/trip.actions';

@Component({
  selector: 'app-sidebar-trip-details',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-trip-details.component.html',
  styleUrl: './sidebar-trip-details.component.css'
})
export class SidebarTripDetailsComponent {
  private readonly store = inject(Store)

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.trip$.subscribe(data => this.trip = data)
  }

  onClick(object: IObject) {
    this.store.dispatch(removeFromTrip({ object }))
  }

  closeDetails(close: boolean) {
    this.close.emit(close)
  }
}
