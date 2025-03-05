import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedevaluationChecklistComponent } from './sharedevaluation-checklist.component';

describe('SharedevaluationChecklistComponent', () => {
  let component: SharedevaluationChecklistComponent;
  let fixture: ComponentFixture<SharedevaluationChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedevaluationChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedevaluationChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
