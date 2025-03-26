import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantPermitSpreadsheetComponent } from './applicant-permit-spreadsheet.component';

describe('ApplicantPermitSpreadsheetComponent', () => {
  let component: ApplicantPermitSpreadsheetComponent;
  let fixture: ComponentFixture<ApplicantPermitSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantPermitSpreadsheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantPermitSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
