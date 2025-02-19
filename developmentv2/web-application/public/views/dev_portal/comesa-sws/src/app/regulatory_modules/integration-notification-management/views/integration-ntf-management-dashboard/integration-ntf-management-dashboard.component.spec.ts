import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationNtfManagementDashboardComponent } from './integration-ntf-management-dashboard.component';

describe('IntegrationNtfManagementDashboardComponent', () => {
  let component: IntegrationNtfManagementDashboardComponent;
  let fixture: ComponentFixture<IntegrationNtfManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationNtfManagementDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationNtfManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
