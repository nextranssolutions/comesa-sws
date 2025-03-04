import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSystemprocessesComponent } from './applicant-systemprocesses.component';

describe('ApplicantSystemprocessesComponent', () => {
  let component: ApplicantSystemprocessesComponent;
  let fixture: ComponentFixture<ApplicantSystemprocessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantSystemprocessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantSystemprocessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
