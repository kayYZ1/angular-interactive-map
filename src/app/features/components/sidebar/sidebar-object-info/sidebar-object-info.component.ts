import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { faArrowLeft, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IObject, ITripDay } from '@/shared/ts/interfaces';
import { selectTripDays } from "@/core/store/trip/trip.selectors";
import { addObjectToTripDay, addTripDay, setActiveTripDay } from "@/core/store/trip/trip.actions";

@Component({
  selector: 'app-sidebar-object-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar-object-info.component.html',
  styleUrl: './sidebar-object-info.component.css'
})
export class SidebarObjectInfoComponent implements OnInit {
  private readonly store = inject(Store);
  tripDays$ = this.store.select(selectTripDays);

  @Input() object!: IObject;
  @Output() closeObjectInfo: EventEmitter<boolean> = new EventEmitter();

  tripDays!: ITripDay[];

  faReturn = faArrowLeft;
  faClose = faClose;
  faPlus = faPlus;

  ngOnInit() {
    this.tripDays$.subscribe(data => this.tripDays = data)
  }

  onClick() {
    this.closeObjectInfo.emit(true);
  }

  addNewTripDay() {
    this.store.dispatch(addTripDay());
  }

  addObjectToTripDay(object: IObject, tripDay: ITripDay) {
    this.store.dispatch(setActiveTripDay({ tripDay }))
    this.store.dispatch(addObjectToTripDay({
      object, id: tripDay.id
    }))
  }
}
