import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCurrencyComponent } from './transaction-currency.component';

describe('TransactionCurrencyComponent', () => {
  let component: TransactionCurrencyComponent;
  let fixture: ComponentFixture<TransactionCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCurrencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
