import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDefinationsComponent } from './checklist-definations.component';

describe('ChecklistDefinationsComponent', () => {
  let component: ChecklistDefinationsComponent;
  let fixture: ComponentFixture<ChecklistDefinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistDefinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecklistDefinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
