import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCategoriesComponent } from './cost-categories.component';

describe('CostCategoriesComponent', () => {
  let component: CostCategoriesComponent;
  let fixture: ComponentFixture<CostCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
