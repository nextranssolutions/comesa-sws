import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatcharetentionInvoicesComponent } from './batcharetention-invoices.component';

describe('BatcharetentionInvoicesComponent', () => {
  let component: BatcharetentionInvoicesComponent;
  let fixture: ComponentFixture<BatcharetentionInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatcharetentionInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatcharetentionInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
