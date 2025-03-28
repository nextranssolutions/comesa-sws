import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewExportapplicationComponent } from './preview-exportapplication.component';

describe('PreviewExportapplicationComponent', () => {
  let component: PreviewExportapplicationComponent;
  let fixture: ComponentFixture<PreviewExportapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewExportapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewExportapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
