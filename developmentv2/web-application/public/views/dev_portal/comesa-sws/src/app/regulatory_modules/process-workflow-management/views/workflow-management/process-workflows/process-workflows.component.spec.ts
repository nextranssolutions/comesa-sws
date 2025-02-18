import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkflowsComponent } from './process-workflows.component';

describe('ProcessWorkflowsComponent', () => {
  let component: ProcessWorkflowsComponent;
  let fixture: ComponentFixture<ProcessWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWorkflowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
