import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenserenDashboardComponent } from './licenseren-dashboard.component';

describe('LicenserenDashboardComponent', () => {
  let component: LicenserenDashboardComponent;
  let fixture: ComponentFixture<LicenserenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenserenDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenserenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
