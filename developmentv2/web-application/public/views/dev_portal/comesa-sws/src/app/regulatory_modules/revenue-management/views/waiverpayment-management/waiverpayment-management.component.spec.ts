import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverpaymentManagementComponent } from './waiverpayment-management.component';

describe('WaiverpaymentManagementComponent', () => {
  let component: WaiverpaymentManagementComponent;
  let fixture: ComponentFixture<WaiverpaymentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiverpaymentManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaiverpaymentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
