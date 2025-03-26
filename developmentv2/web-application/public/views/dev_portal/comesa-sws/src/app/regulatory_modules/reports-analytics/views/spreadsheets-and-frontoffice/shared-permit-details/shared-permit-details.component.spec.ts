import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPermitDetailsComponent } from './shared-permit-details.component';

describe('SharedPermitDetailsComponent', () => {
  let component: SharedPermitDetailsComponent;
  let fixture: ComponentFixture<SharedPermitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPermitDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPermitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
