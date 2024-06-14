import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTripDetailsComponent } from './sidebar-trip-details.component';

describe('SidebarTripDetailsComponent', () => {
  let component: SidebarTripDetailsComponent;
  let fixture: ComponentFixture<SidebarTripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTripDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
