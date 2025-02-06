import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionchargesmanagementSetupComponent } from './retentionchargesmanagement-setup.component';

describe('RetentionchargesmanagementSetupComponent', () => {
  let component: RetentionchargesmanagementSetupComponent;
  let fixture: ComponentFixture<RetentionchargesmanagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetentionchargesmanagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetentionchargesmanagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
