import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesActionsComponent } from './statuses-actions.component';

describe('StatusesActionsComponent', () => {
  let component: StatusesActionsComponent;
  let fixture: ComponentFixture<StatusesActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusesActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
