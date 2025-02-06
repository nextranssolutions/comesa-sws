import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingFeesComponent } from './licensing-fees.component';

describe('LicensingFeesComponent', () => {
  let component: LicensingFeesComponent;
  let fixture: ComponentFixture<LicensingFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicensingFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicensingFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
