import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitproductdetailsComponent } from './permitproductdetails.component';

describe('PermitproductdetailsComponent', () => {
  let component: PermitproductdetailsComponent;
  let fixture: ComponentFixture<PermitproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitproductdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
