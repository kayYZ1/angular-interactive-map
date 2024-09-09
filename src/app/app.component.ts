import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './features/components/header/header.component';
import { SidebarComponent } from './features/components/sidebar/sidebar.component';
import { MapComponent } from './features/components/map/map.component';
import { Store } from '@ngrx/store';
import { setTrip } from './core/store/trip/trip.actions';
import { ITrip } from './shared/ts/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, MapComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  currentView = 'search';

  toggleSidebarView(sidebarView: string) {
    switch (sidebarView) {
      case 'search':
        this.currentView = 'search';
        break;
      case 'trip':
        this.currentView = 'trip';
        break;
      case 'save':
        this.currentView = 'save';
        break;
      default:
        this.currentView = 'map';
        break;
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['state']) {
        try {
          const decodedTrip: ITrip = JSON.parse(
            decodeURIComponent(params['state'])
          );

          this.store.dispatch(
            setTrip({
              trip: decodedTrip,
            })
          );
        } catch (error) {
          console.error('Invalid state');
        }
      }
    });
  }
}
