import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconfigurationsSetupComponent } from './productconfigurations-setup.component';

describe('ProductconfigurationsSetupComponent', () => {
  let component: ProductconfigurationsSetupComponent;
  let fixture: ComponentFixture<ProductconfigurationsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductconfigurationsSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductconfigurationsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
