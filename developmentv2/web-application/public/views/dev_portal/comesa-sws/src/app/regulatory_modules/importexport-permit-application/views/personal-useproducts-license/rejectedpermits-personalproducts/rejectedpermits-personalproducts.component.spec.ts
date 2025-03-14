import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedpermitsPersonalproductsComponent } from './rejectedpermits-personalproducts.component';

describe('RejectedpermitsPersonalproductsComponent', () => {
  let component: RejectedpermitsPersonalproductsComponent;
  let fixture: ComponentFixture<RejectedpermitsPersonalproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedpermitsPersonalproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedpermitsPersonalproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
