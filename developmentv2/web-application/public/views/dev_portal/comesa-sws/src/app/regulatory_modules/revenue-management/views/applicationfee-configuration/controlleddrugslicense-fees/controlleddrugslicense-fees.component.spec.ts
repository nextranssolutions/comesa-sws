import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugslicenseFeesComponent } from './controlleddrugslicense-fees.component';

describe('ControlleddrugslicenseFeesComponent', () => {
  let component: ControlleddrugslicenseFeesComponent;
  let fixture: ComponentFixture<ControlleddrugslicenseFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlleddrugslicenseFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlleddrugslicenseFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
