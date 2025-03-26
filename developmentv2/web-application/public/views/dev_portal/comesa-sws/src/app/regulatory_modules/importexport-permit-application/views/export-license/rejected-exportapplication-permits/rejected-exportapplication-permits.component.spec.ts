import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedExportapplicationPermitsComponent } from './rejected-exportapplication-permits.component';

describe('RejectedExportapplicationPermitsComponent', () => {
  let component: RejectedExportapplicationPermitsComponent;
  let fixture: ComponentFixture<RejectedExportapplicationPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedExportapplicationPermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedExportapplicationPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
