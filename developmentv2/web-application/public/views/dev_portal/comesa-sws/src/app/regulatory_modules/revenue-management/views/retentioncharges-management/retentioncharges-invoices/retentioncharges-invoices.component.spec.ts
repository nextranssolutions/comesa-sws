import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionchargesInvoicesComponent } from './retentioncharges-invoices.component';

describe('RetentionchargesInvoicesComponent', () => {
  let component: RetentionchargesInvoicesComponent;
  let fixture: ComponentFixture<RetentionchargesInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetentionchargesInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetentionchargesInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
