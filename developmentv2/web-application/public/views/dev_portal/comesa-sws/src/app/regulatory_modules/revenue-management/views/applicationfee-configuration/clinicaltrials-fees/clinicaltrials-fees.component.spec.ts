import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialsFeesComponent } from './clinicaltrials-fees.component';

describe('ClinicaltrialsFeesComponent', () => {
  let component: ClinicaltrialsFeesComponent;
  let fixture: ComponentFixture<ClinicaltrialsFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaltrialsFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaltrialsFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
