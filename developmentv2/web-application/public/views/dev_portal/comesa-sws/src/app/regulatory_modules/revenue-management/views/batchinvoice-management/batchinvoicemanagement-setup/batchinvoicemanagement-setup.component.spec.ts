import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchinvoicemanagementSetupComponent } from './batchinvoicemanagement-setup.component';

describe('BatchinvoicemanagementSetupComponent', () => {
  let component: BatchinvoicemanagementSetupComponent;
  let fixture: ComponentFixture<BatchinvoicemanagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchinvoicemanagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchinvoicemanagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
