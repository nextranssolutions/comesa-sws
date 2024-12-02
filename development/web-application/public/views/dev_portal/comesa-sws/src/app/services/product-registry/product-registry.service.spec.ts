import { TestBed } from '@angular/core/testing';

import { ProductRegistryService } from './product-registry.service';

describe('ProductRegistryService', () => {
  let service: ProductRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
