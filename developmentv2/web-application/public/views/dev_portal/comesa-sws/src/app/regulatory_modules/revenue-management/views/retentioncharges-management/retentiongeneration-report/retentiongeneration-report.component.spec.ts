import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentiongenerationReportComponent } from './retentiongeneration-report.component';

describe('RetentiongenerationReportComponent', () => {
  let component: RetentiongenerationReportComponent;
  let fixture: ComponentFixture<RetentiongenerationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetentiongenerationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetentiongenerationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
