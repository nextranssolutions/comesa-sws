import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitGeneralDetailsreportComponent } from './permit-general-detailsreport.component';

describe('PermitGeneralDetailsreportComponent', () => {
  let component: PermitGeneralDetailsreportComponent;
  let fixture: ComponentFixture<PermitGeneralDetailsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitGeneralDetailsreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitGeneralDetailsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
