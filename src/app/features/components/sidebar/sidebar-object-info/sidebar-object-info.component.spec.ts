import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarObjectInfoComponent } from './sidebar-object-info.component';

describe('SidebarObjectInfoComponent', () => {
  let component: SidebarObjectInfoComponent;
  let fixture: ComponentFixture<SidebarObjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarObjectInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarObjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
