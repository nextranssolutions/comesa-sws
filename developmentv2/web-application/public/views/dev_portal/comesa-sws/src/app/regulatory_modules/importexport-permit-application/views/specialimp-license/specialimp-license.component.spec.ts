import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialimpLicenseComponent } from './specialimp-license.component';

describe('SpecialimpLicenseComponent', () => {
  let component: SpecialimpLicenseComponent;
  let fixture: ComponentFixture<SpecialimpLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialimpLicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialimpLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
