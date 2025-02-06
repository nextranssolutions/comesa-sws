import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionchargesPaymentComponent } from './retentioncharges-payment.component';

describe('RetentionchargesPaymentComponent', () => {
  let component: RetentionchargesPaymentComponent;
  let fixture: ComponentFixture<RetentionchargesPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetentionchargesPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetentionchargesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
