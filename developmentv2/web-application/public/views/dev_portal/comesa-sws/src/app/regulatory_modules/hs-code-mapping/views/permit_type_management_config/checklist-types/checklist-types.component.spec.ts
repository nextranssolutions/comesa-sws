import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistTypesComponent } from './checklist-types.component';

describe('ChecklistTypesComponent', () => {
  let component: ChecklistTypesComponent;
  let fixture: ComponentFixture<ChecklistTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecklistTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
