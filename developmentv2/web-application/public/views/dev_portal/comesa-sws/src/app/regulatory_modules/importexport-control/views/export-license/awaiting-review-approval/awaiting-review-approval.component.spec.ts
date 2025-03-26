import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingReviewApprovalComponent } from './awaiting-review-approval.component';

describe('AwaitingReviewApprovalComponent', () => {
  let component: AwaitingReviewApprovalComponent;
  let fixture: ComponentFixture<AwaitingReviewApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingReviewApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingReviewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
