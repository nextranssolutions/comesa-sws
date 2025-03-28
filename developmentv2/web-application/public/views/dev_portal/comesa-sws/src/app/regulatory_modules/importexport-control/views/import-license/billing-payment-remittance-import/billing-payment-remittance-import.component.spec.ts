import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPaymentRemittanceImportComponent } from './billing-payment-remittance-import.component';

describe('BillingPaymentRemittanceImportComponent', () => {
  let component: BillingPaymentRemittanceImportComponent;
  let fixture: ComponentFixture<BillingPaymentRemittanceImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingPaymentRemittanceImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingPaymentRemittanceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
