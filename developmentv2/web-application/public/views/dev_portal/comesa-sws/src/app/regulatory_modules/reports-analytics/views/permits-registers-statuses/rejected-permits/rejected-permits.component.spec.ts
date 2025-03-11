import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPermitsComponent } from './rejected-permits.component';

describe('RejectedPermitsComponent', () => {
  let component: RejectedPermitsComponent;
  let fixture: ComponentFixture<RejectedPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedPermitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
