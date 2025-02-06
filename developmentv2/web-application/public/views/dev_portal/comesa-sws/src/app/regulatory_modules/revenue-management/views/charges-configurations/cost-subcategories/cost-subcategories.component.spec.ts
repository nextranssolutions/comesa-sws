import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSubcategoriesComponent } from './cost-subcategories.component';

describe('CostSubcategoriesComponent', () => {
  let component: CostSubcategoriesComponent;
  let fixture: ComponentFixture<CostSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostSubcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
