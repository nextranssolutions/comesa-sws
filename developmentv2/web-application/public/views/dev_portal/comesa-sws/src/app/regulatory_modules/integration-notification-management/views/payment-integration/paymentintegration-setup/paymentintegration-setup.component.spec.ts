import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentintegrationSetupComponent } from './paymentintegration-setup.component';

describe('PaymentintegrationSetupComponent', () => {
  let component: PaymentintegrationSetupComponent;
  let fixture: ComponentFixture<PaymentintegrationSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentintegrationSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentintegrationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
