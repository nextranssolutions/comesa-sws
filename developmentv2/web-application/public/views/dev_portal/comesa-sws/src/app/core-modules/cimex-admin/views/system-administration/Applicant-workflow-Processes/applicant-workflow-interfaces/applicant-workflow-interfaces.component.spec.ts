import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantWorkflowInterfacesComponent } from './applicant-workflow-interfaces.component';

describe('ApplicantWorkflowInterfacesComponent', () => {
  let component: ApplicantWorkflowInterfacesComponent;
  let fixture: ComponentFixture<ApplicantWorkflowInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantWorkflowInterfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantWorkflowInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
