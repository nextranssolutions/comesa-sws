import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaluseproductsDashComponent } from './personaluseproducts-dash.component';

describe('PersonaluseproductsDashComponent', () => {
  let component: PersonaluseproductsDashComponent;
  let fixture: ComponentFixture<PersonaluseproductsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaluseproductsDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaluseproductsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
