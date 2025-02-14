import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkflowMgtLayoutComponent } from './process-workflow-mgt-layout.component';

describe('ProcessWorkflowMgtLayoutComponent', () => {
  let component: ProcessWorkflowMgtLayoutComponent;
  let fixture: ComponentFixture<ProcessWorkflowMgtLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWorkflowMgtLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessWorkflowMgtLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
