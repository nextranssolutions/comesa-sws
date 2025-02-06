import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAnalyticsHeaderComponent } from './reports-analytics-header.component';

describe('ReportsAnalyticsHeaderComponent', () => {
  let component: ReportsAnalyticsHeaderComponent;
  let fixture: ComponentFixture<ReportsAnalyticsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsAnalyticsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsAnalyticsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
