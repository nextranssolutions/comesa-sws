import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeInstitutionsComponent } from './hscode-institutions.component';

describe('HscodeInstitutionsComponent', () => {
  let component: HscodeInstitutionsComponent;
  let fixture: ComponentFixture<HscodeInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeInstitutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
