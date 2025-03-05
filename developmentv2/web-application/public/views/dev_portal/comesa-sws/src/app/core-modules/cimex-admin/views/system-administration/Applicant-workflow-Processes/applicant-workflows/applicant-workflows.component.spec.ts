import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantWorkflowsComponent } from './applicant-workflows.component';

describe('ApplicantWorkflowsComponent', () => {
  let component: ApplicantWorkflowsComponent;
  let fixture: ComponentFixture<ApplicantWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantWorkflowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
