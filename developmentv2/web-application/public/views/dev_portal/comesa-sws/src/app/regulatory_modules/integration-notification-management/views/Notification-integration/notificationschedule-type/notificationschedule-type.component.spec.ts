import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationscheduleTypeComponent } from './notificationschedule-type.component';

describe('NotificationscheduleTypeComponent', () => {
  let component: NotificationscheduleTypeComponent;
  let fixture: ComponentFixture<NotificationscheduleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationscheduleTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationscheduleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
