import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseWithdrawComponent } from './license-withdraw.component';

describe('LicenseWithdrawComponent', () => {
  let component: LicenseWithdrawComponent;
  let fixture: ComponentFixture<LicenseWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseWithdrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
