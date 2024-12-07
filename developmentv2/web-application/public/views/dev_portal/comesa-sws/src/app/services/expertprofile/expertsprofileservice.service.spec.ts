import { TestBed } from '@angular/core/testing';

import { ExpertsprofileserviceService } from './expertsprofileservice.service';

describe('ExpertsprofileserviceService', () => {
  let service: ExpertsprofileserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertsprofileserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
