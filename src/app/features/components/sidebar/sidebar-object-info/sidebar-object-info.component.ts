import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IObject } from '../../../../shared/ts/interfaces';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar-object-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar-object-info.component.html',
  styleUrl: './sidebar-object-info.component.css'
})
export class SidebarObjectInfoComponent {
  @Input() object!: IObject;

  @Output() closeObjectInfo: EventEmitter<boolean> = new EventEmitter();

  faReturn = faArrowLeft;
  faClose = faClose;

  onClick() {
    this.closeObjectInfo.emit(true);
  }
}
