import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitProductDetailsComponent } from './permit-product-details.component';

describe('PermitProductDetailsComponent', () => {
  let component: PermitProductDetailsComponent;
  let fixture: ComponentFixture<PermitProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitProductDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
