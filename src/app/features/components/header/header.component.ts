import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faMagnifyingGlass, faPersonWalking, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { ITrip } from '../../../shared/ts/interfaces';
import { selectTrip } from '../../../core/store/trip/trip.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faPersonWalking = faPersonWalking;
  faFloppyDisk = faFloppyDisk;

  @Output() sidebarView = new EventEmitter<string>();

  ngOnInit(): void {
    this.trip$.subscribe(data => this.trip = data)
  }

  changeSidebarView(view: string) {
    this.sidebarView.emit(view);
  }
}
