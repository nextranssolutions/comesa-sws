import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePermitproductdetailsComponent } from './single-permitproductdetails.component';

describe('SinglePermitproductdetailsComponent', () => {
  let component: SinglePermitproductdetailsComponent;
  let fixture: ComponentFixture<SinglePermitproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePermitproductdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePermitproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
