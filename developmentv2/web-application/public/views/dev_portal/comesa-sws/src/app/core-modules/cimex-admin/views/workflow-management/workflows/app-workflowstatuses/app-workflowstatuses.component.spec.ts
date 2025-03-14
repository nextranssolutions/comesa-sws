import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkflowstatusesComponent } from './app-workflowstatuses.component';

describe('AppWorkflowstatusesComponent', () => {
  let component: AppWorkflowstatusesComponent;
  let fixture: ComponentFixture<AppWorkflowstatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkflowstatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppWorkflowstatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
