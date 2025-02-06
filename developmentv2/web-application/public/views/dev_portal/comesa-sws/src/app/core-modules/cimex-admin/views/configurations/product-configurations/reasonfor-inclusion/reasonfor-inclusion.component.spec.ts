import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonforInclusionComponent } from './reasonfor-inclusion.component';

describe('ReasonforInclusionComponent', () => {
  let component: ReasonforInclusionComponent;
  let fixture: ComponentFixture<ReasonforInclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReasonforInclusionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasonforInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
