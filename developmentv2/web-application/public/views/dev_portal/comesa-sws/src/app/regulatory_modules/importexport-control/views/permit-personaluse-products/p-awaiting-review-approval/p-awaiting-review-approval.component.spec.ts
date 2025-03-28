import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAwaitingReviewApprovalComponent } from './p-awaiting-review-approval.component';

describe('PAwaitingReviewApprovalComponent', () => {
  let component: PAwaitingReviewApprovalComponent;
  let fixture: ComponentFixture<PAwaitingReviewApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAwaitingReviewApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAwaitingReviewApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
