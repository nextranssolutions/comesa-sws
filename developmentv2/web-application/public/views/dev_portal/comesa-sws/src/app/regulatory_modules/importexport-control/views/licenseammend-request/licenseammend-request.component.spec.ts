import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseammendRequestComponent } from './licenseammend-request.component';

describe('LicenseammendRequestComponent', () => {
  let component: LicenseammendRequestComponent;
  let fixture: ComponentFixture<LicenseammendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseammendRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseammendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
