import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IObject, ITripDay } from '../../../../shared/ts/interfaces';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { selectTripDays } from '../../../../core/store/trip/trip.selectors';
import { addObjectToTripDay, setActiveTripDay } from '../../../../core/store/trip/trip.actions';

@Component({
  selector: 'app-sidebar-object-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar-object-info.component.html',
  styleUrl: './sidebar-object-info.component.css'
})
export class SidebarObjectInfoComponent {
  private readonly store = inject(Store);
  tripDays$ = this.store.select(selectTripDays);

  @Input() object!: IObject;
  @Output() closeObjectInfo: EventEmitter<boolean> = new EventEmitter();

  tripDays!: ITripDay[];

  faReturn = faArrowLeft;
  faClose = faClose;

  ngOnInit() {
    this.tripDays$.subscribe(data => this.tripDays = data)
  }

  onClick() {
    this.closeObjectInfo.emit(true);
  }

  addObjectToTripDay(object: IObject, tripDay: ITripDay) {
    this.store.dispatch(setActiveTripDay({ tripDay }))
    this.store.dispatch(addObjectToTripDay({
      object
    }))
  }
}
