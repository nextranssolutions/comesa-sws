import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductspecialCategoryComponent } from './productspecial-category.component';

describe('ProductspecialCategoryComponent', () => {
  let component: ProductspecialCategoryComponent;
  let fixture: ComponentFixture<ProductspecialCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductspecialCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductspecialCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
