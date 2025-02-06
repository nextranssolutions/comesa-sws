import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDuetimespanComponent } from './registration-duetimespan.component';

describe('RegistrationDuetimespanComponent', () => {
  let component: RegistrationDuetimespanComponent;
  let fixture: ComponentFixture<RegistrationDuetimespanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationDuetimespanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationDuetimespanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
