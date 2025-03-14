import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterofapprovalPersonalproductsComponent } from './letterofapproval-personalproducts.component';

describe('LetterofapprovalPersonalproductsComponent', () => {
  let component: LetterofapprovalPersonalproductsComponent;
  let fixture: ComponentFixture<LetterofapprovalPersonalproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterofapprovalPersonalproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LetterofapprovalPersonalproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
