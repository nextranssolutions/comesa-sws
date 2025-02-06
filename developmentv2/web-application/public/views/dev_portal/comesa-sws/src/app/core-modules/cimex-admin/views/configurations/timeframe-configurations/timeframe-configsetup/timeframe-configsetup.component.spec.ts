import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeConfigsetupComponent } from './timeframe-configsetup.component';

describe('TimeframeConfigsetupComponent', () => {
  let component: TimeframeConfigsetupComponent;
  let fixture: ComponentFixture<TimeframeConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeframeConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeframeConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
