import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionmaterialCategoriesComponent } from './promotionmaterial-categories.component';

describe('PromotionmaterialCategoriesComponent', () => {
  let component: PromotionmaterialCategoriesComponent;
  let fixture: ComponentFixture<PromotionmaterialCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionmaterialCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionmaterialCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
