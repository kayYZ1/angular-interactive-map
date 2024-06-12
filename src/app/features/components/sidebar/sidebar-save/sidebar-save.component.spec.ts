import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSaveComponent } from './sidebar-save.component';

describe('SidebarSaveComponent', () => {
  let component: SidebarSaveComponent;
  let fixture: ComponentFixture<SidebarSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
