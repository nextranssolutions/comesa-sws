import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentremittanceOptionsComponent } from './paymentremittance-options.component';

describe('PaymentremittanceOptionsComponent', () => {
  let component: PaymentremittanceOptionsComponent;
  let fixture: ComponentFixture<PaymentremittanceOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentremittanceOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentremittanceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
