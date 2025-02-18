import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWorkflowMgtNavigationComponent } from './process-workflow-mgt-navigation.component';

describe('ProcessWorkflowMgtNavigationComponent', () => {
  let component: ProcessWorkflowMgtNavigationComponent;
  let fixture: ComponentFixture<ProcessWorkflowMgtNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWorkflowMgtNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessWorkflowMgtNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
