import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateNewpremiseApplicationComponent } from './initiate-newpremise-application.component';

describe('InitiateNewpremiseApplicationComponent', () => {
  let component: InitiateNewpremiseApplicationComponent;
  let fixture: ComponentFixture<InitiateNewpremiseApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiateNewpremiseApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateNewpremiseApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
