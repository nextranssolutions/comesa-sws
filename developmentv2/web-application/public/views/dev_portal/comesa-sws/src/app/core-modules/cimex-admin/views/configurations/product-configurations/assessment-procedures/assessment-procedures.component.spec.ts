import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProceduresComponent } from './assessment-procedures.component';

describe('AssessmentProceduresComponent', () => {
  let component: AssessmentProceduresComponent;
  let fixture: ComponentFixture<AssessmentProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
