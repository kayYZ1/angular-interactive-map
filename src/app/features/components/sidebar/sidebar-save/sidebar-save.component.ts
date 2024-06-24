import { Component, NgModule, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrip } from '../../../../core/store/trip/trip.selectors';
import { ITrip } from '../../../../shared/ts/interfaces';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { setName } from '../../../../core/store/trip/trip.actions';

@Component({
  selector: 'app-sidebar-save',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './sidebar-save.component.html',
  styleUrl: './sidebar-save.component.css'
})
export class SidebarSaveComponent {
  private readonly store = inject(Store);

  trip$ = this.store.select(selectTrip);
  trip!: ITrip;

  tripName = ""

  faSave = faSave;

  ngOnInit(): void {
    this.trip$.subscribe(data => this.trip = data)
  }

  onChange(name: string) {
    this.store.dispatch(setName({ name }))
  }
}
