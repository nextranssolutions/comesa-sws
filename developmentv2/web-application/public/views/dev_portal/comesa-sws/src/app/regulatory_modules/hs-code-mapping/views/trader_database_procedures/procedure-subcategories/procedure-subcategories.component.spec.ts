import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureSubcategoriesComponent } from './procedure-subcategories.component';

describe('ProcedureSubcategoriesComponent', () => {
  let component: ProcedureSubcategoriesComponent;
  let fixture: ComponentFixture<ProcedureSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureSubcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
