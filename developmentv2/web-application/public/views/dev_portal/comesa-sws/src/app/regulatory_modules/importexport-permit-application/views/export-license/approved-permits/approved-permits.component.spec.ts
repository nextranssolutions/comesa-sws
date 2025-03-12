import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPermitsComponent } from './approved-permits.component';

describe('ApprovedPermitsComponent', () => {
  let component: ApprovedPermitsComponent;
  let fixture: ComponentFixture<ApprovedPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
