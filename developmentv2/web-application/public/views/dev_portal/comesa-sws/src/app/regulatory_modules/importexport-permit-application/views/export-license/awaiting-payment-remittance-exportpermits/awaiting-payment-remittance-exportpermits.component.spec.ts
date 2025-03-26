import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPaymentRemittanceExportpermitsComponent } from './awaiting-payment-remittance-exportpermits.component';

describe('AwaitingPaymentRemittanceExportpermitsComponent', () => {
  let component: AwaitingPaymentRemittanceExportpermitsComponent;
  let fixture: ComponentFixture<AwaitingPaymentRemittanceExportpermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingPaymentRemittanceExportpermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingPaymentRemittanceExportpermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
