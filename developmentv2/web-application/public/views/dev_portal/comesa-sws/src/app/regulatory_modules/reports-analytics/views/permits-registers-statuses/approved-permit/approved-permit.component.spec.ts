import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPermitComponent } from './approved-permit.component';

describe('ApprovedPermitComponent', () => {
  let component: ApprovedPermitComponent;
  let fixture: ComponentFixture<ApprovedPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
