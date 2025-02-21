import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionGeneraldetailsComponent } from './inspection-generaldetails.component';

describe('InspectionGeneraldetailsComponent', () => {
  let component: InspectionGeneraldetailsComponent;
  let fixture: ComponentFixture<InspectionGeneraldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionGeneraldetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspectionGeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
