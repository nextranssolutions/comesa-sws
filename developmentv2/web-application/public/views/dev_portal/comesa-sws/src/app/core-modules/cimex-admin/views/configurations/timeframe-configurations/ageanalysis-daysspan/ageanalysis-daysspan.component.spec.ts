import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeanalysisDaysspanComponent } from './ageanalysis-daysspan.component';

describe('AgeanalysisDaysspanComponent', () => {
  let component: AgeanalysisDaysspanComponent;
  let fixture: ComponentFixture<AgeanalysisDaysspanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeanalysisDaysspanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgeanalysisDaysspanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
