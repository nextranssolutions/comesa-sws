import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentintegrationTypesComponent } from './paymentintegration-types.component';

describe('PaymentintegrationTypesComponent', () => {
  let component: PaymentintegrationTypesComponent;
  let fixture: ComponentFixture<PaymentintegrationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentintegrationTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentintegrationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
