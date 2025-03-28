import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitProductDetailsReportComponent } from './permit-product-details-report.component';

describe('PermitProductDetailsReportComponent', () => {
  let component: PermitProductDetailsReportComponent;
  let fixture: ComponentFixture<PermitProductDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitProductDetailsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitProductDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
