import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReportsSpreadsheetsComponent } from './application-reports-spreadsheets.component';

describe('ApplicationReportsSpreadsheetsComponent', () => {
  let component: ApplicationReportsSpreadsheetsComponent;
  let fixture: ComponentFixture<ApplicationReportsSpreadsheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationReportsSpreadsheetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationReportsSpreadsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
