import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPostingComponent } from './bill-posting.component';

describe('BillPostingComponent', () => {
  let component: BillPostingComponent;
  let fixture: ComponentFixture<BillPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillPostingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
