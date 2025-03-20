import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDetailsreportComponent } from './applicant-detailsreport.component';

describe('ApplicantDetailsreportComponent', () => {
  let component: ApplicantDetailsreportComponent;
  let fixture: ComponentFixture<ApplicantDetailsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantDetailsreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantDetailsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
