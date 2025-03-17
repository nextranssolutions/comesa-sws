import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePersonaluseproductsPermitApplicationComponent } from './single-personaluseproducts-permit-application.component';

describe('SinglePersonaluseproductsPermitApplicationComponent', () => {
  let component: SinglePersonaluseproductsPermitApplicationComponent;
  let fixture: ComponentFixture<SinglePersonaluseproductsPermitApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePersonaluseproductsPermitApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePersonaluseproductsPermitApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
