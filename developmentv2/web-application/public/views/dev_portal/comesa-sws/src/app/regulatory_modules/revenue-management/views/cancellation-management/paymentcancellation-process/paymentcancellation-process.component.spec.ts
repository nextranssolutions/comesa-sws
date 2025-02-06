import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcancellationProcessComponent } from './paymentcancellation-process.component';

describe('PaymentcancellationProcessComponent', () => {
  let component: PaymentcancellationProcessComponent;
  let fixture: ComponentFixture<PaymentcancellationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentcancellationProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentcancellationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
