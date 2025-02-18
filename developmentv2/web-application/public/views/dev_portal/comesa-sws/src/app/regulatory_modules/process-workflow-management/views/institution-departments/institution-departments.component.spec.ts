import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDepartmentsComponent } from './institution-departments.component';

describe('InstitutionDepartmentsComponent', () => {
  let component: InstitutionDepartmentsComponent;
  let fixture: ComponentFixture<InstitutionDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionDepartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
