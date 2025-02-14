import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsProhibitionsComponent } from './restrictions-prohibitions.component';

describe('RestrictionsProhibitionsComponent', () => {
  let component: RestrictionsProhibitionsComponent;
  let fixture: ComponentFixture<RestrictionsProhibitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionsProhibitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrictionsProhibitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
