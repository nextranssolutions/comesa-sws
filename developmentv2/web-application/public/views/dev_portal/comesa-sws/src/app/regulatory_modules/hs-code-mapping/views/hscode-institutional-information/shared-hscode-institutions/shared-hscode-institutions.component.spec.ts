import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHscodeInstitutionsComponent } from './shared-hscode-institutions.component';

describe('SharedHscodeInstitutionsComponent', () => {
  let component: SharedHscodeInstitutionsComponent;
  let fixture: ComponentFixture<SharedHscodeInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHscodeInstitutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedHscodeInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
