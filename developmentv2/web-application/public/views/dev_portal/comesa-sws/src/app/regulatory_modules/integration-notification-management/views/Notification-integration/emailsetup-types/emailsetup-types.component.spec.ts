import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsetupTypesComponent } from './emailsetup-types.component';

describe('EmailsetupTypesComponent', () => {
  let component: EmailsetupTypesComponent;
  let fixture: ComponentFixture<EmailsetupTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailsetupTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailsetupTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
