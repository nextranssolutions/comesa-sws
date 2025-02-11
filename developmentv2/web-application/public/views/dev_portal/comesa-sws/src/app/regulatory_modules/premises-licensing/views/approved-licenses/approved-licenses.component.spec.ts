import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLicensesComponent } from './approved-licenses.component';

describe('ApprovedLicensesComponent', () => {
  let component: ApprovedLicensesComponent;
  let fixture: ComponentFixture<ApprovedLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedLicensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
