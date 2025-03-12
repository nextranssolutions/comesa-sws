import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitapplicationTimelineComponent } from './permitapplication-timeline.component';

describe('PermitapplicationTimelineComponent', () => {
  let component: PermitapplicationTimelineComponent;
  let fixture: ComponentFixture<PermitapplicationTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitapplicationTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitapplicationTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
