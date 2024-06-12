import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faMagnifyingGlass, faPersonWalking, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faPersonWalking = faPersonWalking;
  faFloppyDisk = faFloppyDisk;

  @Output() sidebarView = new EventEmitter<string>();

  changeSidebarView(view: string) {
    this.sidebarView.emit(view);
  }
}
