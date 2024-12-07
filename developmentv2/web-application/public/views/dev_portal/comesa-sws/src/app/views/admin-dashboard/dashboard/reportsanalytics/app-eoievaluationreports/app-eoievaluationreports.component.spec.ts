import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEoievaluationreportsComponent } from './app-eoievaluationreports.component';

describe('AppEoievaluationreportsComponent', () => {
  let component: AppEoievaluationreportsComponent;
  let fixture: ComponentFixture<AppEoievaluationreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEoievaluationreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppEoievaluationreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
