import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStagesComponent } from './workflow-stages.component';

describe('WorkflowStagesComponent', () => {
  let component: WorkflowStagesComponent;
  let fixture: ComponentFixture<WorkflowStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowStagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
