import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPerformanceComponent } from './process-performance.component';

describe('ProcessPerformanceComponent', () => {
  let component: ProcessPerformanceComponent;
  let fixture: ComponentFixture<ProcessPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
