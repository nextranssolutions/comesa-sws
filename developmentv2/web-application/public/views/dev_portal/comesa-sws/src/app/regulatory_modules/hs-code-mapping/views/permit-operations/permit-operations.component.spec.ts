import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitOperationsComponent } from './permit-operations.component';

describe('PermitOperationsComponent', () => {
  let component: PermitOperationsComponent;
  let fixture: ComponentFixture<PermitOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitOperationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
