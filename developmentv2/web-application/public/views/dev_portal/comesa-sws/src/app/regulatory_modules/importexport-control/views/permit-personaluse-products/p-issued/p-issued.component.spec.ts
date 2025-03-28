import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIssuedComponent } from './p-issued.component';

describe('PIssuedComponent', () => {
  let component: PIssuedComponent;
  let fixture: ComponentFixture<PIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PIssuedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
