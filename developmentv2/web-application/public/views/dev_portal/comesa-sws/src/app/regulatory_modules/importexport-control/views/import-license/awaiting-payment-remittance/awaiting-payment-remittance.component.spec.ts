import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPaymentRemittanceComponent } from './awaiting-payment-remittance.component';

describe('AwaitingPaymentRemittanceComponent', () => {
  let component: AwaitingPaymentRemittanceComponent;
  let fixture: ComponentFixture<AwaitingPaymentRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingPaymentRemittanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingPaymentRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
