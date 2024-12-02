import { TestBed } from '@angular/core/testing';
import { ExpressionOfInterestManagementService } from './expression-of-interest-management.service';




describe('ExpressionOfInterestManagementService', () => {
  let service: ExpressionOfInterestManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionOfInterestManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
