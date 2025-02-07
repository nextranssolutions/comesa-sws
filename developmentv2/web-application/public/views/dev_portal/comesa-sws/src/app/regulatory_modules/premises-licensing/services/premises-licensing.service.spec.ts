import { TestBed } from '@angular/core/testing';

import { PremisesLicensingService } from './premises-licensing.service';

describe('PremisesLicensingService', () => {
  let service: PremisesLicensingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremisesLicensingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
