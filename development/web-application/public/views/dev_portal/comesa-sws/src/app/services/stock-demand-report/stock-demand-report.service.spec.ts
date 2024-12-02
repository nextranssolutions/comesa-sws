import { TestBed } from '@angular/core/testing';

import { StockDemandReportService } from './stock-demand-report.service';

describe('StockDemandReportService', () => {
  let service: StockDemandReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDemandReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
