import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureCategoriesComponent } from './procedure-categories.component';

describe('ProcedureCategoriesComponent', () => {
  let component: ProcedureCategoriesComponent;
  let fixture: ComponentFixture<ProcedureCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
