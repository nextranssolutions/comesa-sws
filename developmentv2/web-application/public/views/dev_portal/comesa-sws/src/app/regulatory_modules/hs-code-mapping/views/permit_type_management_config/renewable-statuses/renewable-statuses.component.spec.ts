import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewableStatusesComponent } from './renewable-statuses.component';

describe('RenewableStatusesComponent', () => {
  let component: RenewableStatusesComponent;
  let fixture: ComponentFixture<RenewableStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewableStatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewableStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
