import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementReportsdashboardComponent } from './management-reportsdashboard.component';

describe('ManagementReportsdashboardComponent', () => {
  let component: ManagementReportsdashboardComponent;
  let fixture: ComponentFixture<ManagementReportsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementReportsdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementReportsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
