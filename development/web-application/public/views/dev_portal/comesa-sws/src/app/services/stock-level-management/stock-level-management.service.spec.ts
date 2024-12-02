import { TestBed } from '@angular/core/testing';

import { StockLevelManagementService } from './stock-level-management.service';

describe('StockLevelManagementService', () => {
  let service: StockLevelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockLevelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
