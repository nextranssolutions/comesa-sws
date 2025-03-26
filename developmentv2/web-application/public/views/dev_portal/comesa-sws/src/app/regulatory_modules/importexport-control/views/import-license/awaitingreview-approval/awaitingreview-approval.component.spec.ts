import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingreviewApprovalComponent } from './awaitingreview-approval.component';

describe('AwaitingreviewApprovalComponent', () => {
  let component: AwaitingreviewApprovalComponent;
  let fixture: ComponentFixture<AwaitingreviewApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingreviewApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingreviewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
