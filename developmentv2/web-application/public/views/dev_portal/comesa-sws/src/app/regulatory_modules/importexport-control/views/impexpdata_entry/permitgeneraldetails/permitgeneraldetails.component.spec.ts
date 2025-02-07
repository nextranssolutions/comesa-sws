import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitgeneraldetailsComponent } from './permitgeneraldetails.component';

describe('PermitgeneraldetailsComponent', () => {
  let component: PermitgeneraldetailsComponent;
  let fixture: ComponentFixture<PermitgeneraldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitgeneraldetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitgeneraldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
