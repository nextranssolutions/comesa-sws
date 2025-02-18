import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkflowMgtHeaderComponent } from './process-workflow-mgt-header.component';

describe('ProcessWorkflowMgtHeaderComponent', () => {
  let component: ProcessWorkflowMgtHeaderComponent;
  let fixture: ComponentFixture<ProcessWorkflowMgtHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWorkflowMgtHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessWorkflowMgtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
