import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuemngntDashboardComponent } from './revenuemngnt-dashboard.component';

describe('RevenuemngntDashboardComponent', () => {
  let component: RevenuemngntDashboardComponent;
  let fixture: ComponentFixture<RevenuemngntDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenuemngntDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuemngntDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
