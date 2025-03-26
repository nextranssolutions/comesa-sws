import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderProcessingExportPermitapplicationsComponent } from './under-processing-export-permitapplications.component';

describe('UnderProcessingExportPermitapplicationsComponent', () => {
  let component: UnderProcessingExportPermitapplicationsComponent;
  let fixture: ComponentFixture<UnderProcessingExportPermitapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderProcessingExportPermitapplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderProcessingExportPermitapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
