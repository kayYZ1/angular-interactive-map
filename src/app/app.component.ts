import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './features/components/header/header.component';
import { SidebarComponent } from './features/components/sidebar/sidebar.component';
import { MapComponent } from './features/components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
}
