import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCancellationComponent } from './invoice-cancellation.component';

describe('InvoiceCancellationComponent', () => {
  let component: InvoiceCancellationComponent;
  let fixture: ComponentFixture<InvoiceCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCancellationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
