import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdclassificationCategoriesComponent } from './prodclassification-categories.component';

describe('ProdclassificationCategoriesComponent', () => {
  let component: ProdclassificationCategoriesComponent;
  let fixture: ComponentFixture<ProdclassificationCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdclassificationCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdclassificationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
