import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeInstitutionDepartmentsComponent } from './hscode-institution-departments.component';

describe('HscodeInstitutionDepartmentsComponent', () => {
  let component: HscodeInstitutionDepartmentsComponent;
  let fixture: ComponentFixture<HscodeInstitutionDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeInstitutionDepartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeInstitutionDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
