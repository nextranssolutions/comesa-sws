import { TestBed } from '@angular/core/testing';

import { ProcessWorkflowMgtService } from './process-workflow-mgt.service';

describe('ProcessWorkflowMgtService', () => {
  let service: ProcessWorkflowMgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessWorkflowMgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
