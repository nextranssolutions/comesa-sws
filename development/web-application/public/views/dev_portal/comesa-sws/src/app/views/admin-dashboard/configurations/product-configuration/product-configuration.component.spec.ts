import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigurationComponent } from './product-configuration.component';

describe('ProductConfigurationComponent', () => {
  let component: ProductConfigurationComponent;
  let fixture: ComponentFixture<ProductConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
