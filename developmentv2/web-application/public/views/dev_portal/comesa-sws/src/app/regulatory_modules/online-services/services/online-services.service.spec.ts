import { TestBed } from '@angular/core/testing';

import { OnlineServicesService } from './online-services.service';

describe('OnlineServicesService', () => {
  let service: OnlineServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
