import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedappApplicantprocesssubmissionComponent } from './sharedapp-applicantprocesssubmission.component';

describe('SharedappApplicantprocesssubmissionComponent', () => {
  let component: SharedappApplicantprocesssubmissionComponent;
  let fixture: ComponentFixture<SharedappApplicantprocesssubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedappApplicantprocesssubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedappApplicantprocesssubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
