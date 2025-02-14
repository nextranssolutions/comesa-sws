import { TestBed } from '@angular/core/testing';

import { IntegrationNtfManagementService } from './integration-ntf-management.service';

describe('IntegrationNtfManagementService', () => {
  let service: IntegrationNtfManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegrationNtfManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
