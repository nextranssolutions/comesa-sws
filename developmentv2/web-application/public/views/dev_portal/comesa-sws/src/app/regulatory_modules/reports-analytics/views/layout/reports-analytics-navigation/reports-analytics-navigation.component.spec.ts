import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAnalyticsNavigationComponent } from './reports-analytics-navigation.component';

describe('ReportsAnalyticsNavigationComponent', () => {
  let component: ReportsAnalyticsNavigationComponent;
  let fixture: ComponentFixture<ReportsAnalyticsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsAnalyticsNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsAnalyticsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
