import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresCategoriesComponent } from './procedures-categories.component';

describe('ProceduresCategoriesComponent', () => {
  let component: ProceduresCategoriesComponent;
  let fixture: ComponentFixture<ProceduresCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
