import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCategoryComponent } from './ingredients-category.component';

describe('IngredientsCategoryComponent', () => {
  let component: IngredientsCategoryComponent;
  let fixture: ComponentFixture<IngredientsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
