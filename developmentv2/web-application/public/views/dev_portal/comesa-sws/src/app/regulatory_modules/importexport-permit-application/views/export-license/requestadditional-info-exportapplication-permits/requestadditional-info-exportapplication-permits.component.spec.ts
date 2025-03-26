import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestadditionalInfoExportapplicationPermitsComponent } from './requestadditional-info-exportapplication-permits.component';

describe('RequestadditionalInfoExportapplicationPermitsComponent', () => {
  let component: RequestadditionalInfoExportapplicationPermitsComponent;
  let fixture: ComponentFixture<RequestadditionalInfoExportapplicationPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestadditionalInfoExportapplicationPermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestadditionalInfoExportapplicationPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
