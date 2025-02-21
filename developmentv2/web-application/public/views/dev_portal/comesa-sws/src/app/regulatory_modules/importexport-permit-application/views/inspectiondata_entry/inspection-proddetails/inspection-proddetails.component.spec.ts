import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionProddetailsComponent } from './inspection-proddetails.component';

describe('InspectionProddetailsComponent', () => {
  let component: InspectionProddetailsComponent;
  let fixture: ComponentFixture<InspectionProddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionProddetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspectionProddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
