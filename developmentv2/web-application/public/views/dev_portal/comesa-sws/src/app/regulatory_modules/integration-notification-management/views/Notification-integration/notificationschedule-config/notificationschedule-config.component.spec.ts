import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationscheduleConfigComponent } from './notificationschedule-config.component';

describe('NotificationscheduleConfigComponent', () => {
  let component: NotificationscheduleConfigComponent;
  let fixture: ComponentFixture<NotificationscheduleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationscheduleConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationscheduleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
