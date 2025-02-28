import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeComponent } from './invoice-type.component';

describe('InvoiceTypeComponent', () => {
  let component: InvoiceTypeComponent;
  let fixture: ComponentFixture<InvoiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
