import { Component, Input } from '@angular/core';

import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters.component';
import { SidebarTripComponent } from './sidebar-trip/sidebar-trip.component';
import { SidebarSaveComponent } from './sidebar-save/sidebar-save.component';
import { SidebarListComponent } from './sidebar-filters/sidebar-list/sidebar-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarFiltersComponent, SidebarTripComponent, SidebarSaveComponent, SidebarListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() view!: string;
}
