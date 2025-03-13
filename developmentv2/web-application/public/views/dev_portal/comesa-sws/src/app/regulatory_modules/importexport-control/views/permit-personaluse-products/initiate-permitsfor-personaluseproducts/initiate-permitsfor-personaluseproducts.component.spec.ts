import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatePermitsforPersonaluseproductsComponent } from './initiate-permitsfor-personaluseproducts.component';

describe('InitiatePermitsforPersonaluseproductsComponent', () => {
  let component: InitiatePermitsforPersonaluseproductsComponent;
  let fixture: ComponentFixture<InitiatePermitsforPersonaluseproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiatePermitsforPersonaluseproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiatePermitsforPersonaluseproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
