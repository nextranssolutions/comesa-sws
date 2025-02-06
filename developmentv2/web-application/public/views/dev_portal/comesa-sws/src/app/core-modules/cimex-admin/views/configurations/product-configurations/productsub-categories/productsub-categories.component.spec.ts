import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsubCategoriesComponent } from './productsub-categories.component';

describe('ProductsubCategoriesComponent', () => {
  let component: ProductsubCategoriesComponent;
  let fixture: ComponentFixture<ProductsubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsubCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
