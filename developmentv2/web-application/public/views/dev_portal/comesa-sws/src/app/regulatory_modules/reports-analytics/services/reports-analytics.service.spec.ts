import { TestBed } from '@angular/core/testing';

import { ReportsAnalyticsService } from './reports-analytics.service';

describe('ReportsAnalyticsService', () => {
  let service: ReportsAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
