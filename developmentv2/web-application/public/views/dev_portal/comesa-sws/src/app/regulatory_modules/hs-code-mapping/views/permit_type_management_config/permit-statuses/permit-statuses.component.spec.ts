import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitStatusesComponent } from './permit-statuses.component';

describe('PermitStatusesComponent', () => {
  let component: PermitStatusesComponent;
  let fixture: ComponentFixture<PermitStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitStatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
