import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitStorageConditionsComponent } from './permit-storage-conditions.component';

describe('PermitStorageConditionsComponent', () => {
  let component: PermitStorageConditionsComponent;
  let fixture: ComponentFixture<PermitStorageConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitStorageConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitStorageConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
