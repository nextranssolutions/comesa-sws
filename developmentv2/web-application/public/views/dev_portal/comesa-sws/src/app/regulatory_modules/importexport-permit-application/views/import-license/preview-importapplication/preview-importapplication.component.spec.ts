import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImportapplicationComponent } from './preview-importapplication.component';

describe('PreviewImportapplicationComponent', () => {
  let component: PreviewImportapplicationComponent;
  let fixture: ComponentFixture<PreviewImportapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewImportapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewImportapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
