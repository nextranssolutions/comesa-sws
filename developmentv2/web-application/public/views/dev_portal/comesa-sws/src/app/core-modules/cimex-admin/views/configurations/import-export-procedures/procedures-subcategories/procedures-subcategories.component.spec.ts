import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresSubcategoriesComponent } from './procedures-subcategories.component';

describe('ProceduresSubcategoriesComponent', () => {
  let component: ProceduresSubcategoriesComponent;
  let fixture: ComponentFixture<ProceduresSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresSubcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
