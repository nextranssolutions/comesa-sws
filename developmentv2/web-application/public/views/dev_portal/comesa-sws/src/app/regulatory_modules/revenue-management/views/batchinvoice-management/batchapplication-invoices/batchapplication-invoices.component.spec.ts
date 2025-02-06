import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchapplicationInvoicesComponent } from './batchapplication-invoices.component';

describe('BatchapplicationInvoicesComponent', () => {
  let component: BatchapplicationInvoicesComponent;
  let fixture: ComponentFixture<BatchapplicationInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchapplicationInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchapplicationInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
