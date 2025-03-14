import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatePersonalproductsPermitComponent } from './initiate-personalproducts-permit.component';

describe('InitiatePersonalproductsPermitComponent', () => {
  let component: InitiatePersonalproductsPermitComponent;
  let fixture: ComponentFixture<InitiatePersonalproductsPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiatePersonalproductsPermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiatePersonalproductsPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
