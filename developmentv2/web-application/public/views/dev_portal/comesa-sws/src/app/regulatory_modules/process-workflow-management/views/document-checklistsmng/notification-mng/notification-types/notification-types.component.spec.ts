import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypesComponent } from './notification-types.component';

describe('NotificationTypesComponent', () => {
  let component: NotificationTypesComponent;
  let fixture: ComponentFixture<NotificationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
