import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedExportapplicationPermitsComponent } from './approved-exportapplication-permits.component';

describe('ApprovedExportapplicationPermitsComponent', () => {
  let component: ApprovedExportapplicationPermitsComponent;
  let fixture: ComponentFixture<ApprovedExportapplicationPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedExportapplicationPermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedExportapplicationPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
