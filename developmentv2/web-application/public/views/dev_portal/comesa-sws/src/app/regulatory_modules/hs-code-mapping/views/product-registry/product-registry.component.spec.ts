import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistryComponent } from './product-registry.component';

describe('ProductRegistryComponent', () => {
  let component: ProductRegistryComponent;
  let fixture: ComponentFixture<ProductRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
