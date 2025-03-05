import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantWorkflowsetupComponent } from './applicant-workflowsetup.component';

describe('ApplicantWorkflowsetupComponent', () => {
  let component: ApplicantWorkflowsetupComponent;
  let fixture: ComponentFixture<ApplicantWorkflowsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantWorkflowsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantWorkflowsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
