import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductclassCategoriesComponent } from './productclass-categories.component';

describe('ProductclassCategoriesComponent', () => {
  let component: ProductclassCategoriesComponent;
  let fixture: ComponentFixture<ProductclassCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductclassCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductclassCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
