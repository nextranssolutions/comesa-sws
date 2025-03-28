import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingandpaymentRemittanceExportComponent } from './billingandpayment-remittance-export.component';

describe('BillingandpaymentRemittanceExportComponent', () => {
  let component: BillingandpaymentRemittanceExportComponent;
  let fixture: ComponentFixture<BillingandpaymentRemittanceExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingandpaymentRemittanceExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingandpaymentRemittanceExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
