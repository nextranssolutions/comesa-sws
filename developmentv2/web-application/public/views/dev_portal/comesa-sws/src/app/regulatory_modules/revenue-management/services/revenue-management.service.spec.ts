import { TestBed } from '@angular/core/testing';

import { RevenueManagementService } from './revenue-management.service';

describe('RevenueManagementService', () => {
  let service: RevenueManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
