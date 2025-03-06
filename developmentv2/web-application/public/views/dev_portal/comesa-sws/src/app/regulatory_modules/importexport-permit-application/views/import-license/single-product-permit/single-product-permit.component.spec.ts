import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductPermitComponent } from './single-product-permit.component';

describe('SingleProductPermitComponent', () => {
  let component: SingleProductPermitComponent;
  let fixture: ComponentFixture<SingleProductPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductPermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
