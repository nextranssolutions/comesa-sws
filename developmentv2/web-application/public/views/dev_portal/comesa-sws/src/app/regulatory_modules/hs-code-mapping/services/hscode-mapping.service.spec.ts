import { TestBed } from '@angular/core/testing';

import { HscodeMappingService } from './hscode-mapping.service';

describe('HscodeMappingService', () => {
  let service: HscodeMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HscodeMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
