import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedappdocumentsuploadReportComponent } from './sharedappdocumentsupload-report.component';

describe('SharedappdocumentsuploadReportComponent', () => {
  let component: SharedappdocumentsuploadReportComponent;
  let fixture: ComponentFixture<SharedappdocumentsuploadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedappdocumentsuploadReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedappdocumentsuploadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
