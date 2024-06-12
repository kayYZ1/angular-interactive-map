import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTripComponent } from './sidebar-trip.component';

describe('SidebarTripComponent', () => {
  let component: SidebarTripComponent;
  let fixture: ComponentFixture<SidebarTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
