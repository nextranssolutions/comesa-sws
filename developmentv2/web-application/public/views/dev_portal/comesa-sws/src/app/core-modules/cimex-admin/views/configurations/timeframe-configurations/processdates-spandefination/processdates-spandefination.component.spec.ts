import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessdatesSpandefinationComponent } from './processdates-spandefination.component';

describe('ProcessdatesSpandefinationComponent', () => {
  let component: ProcessdatesSpandefinationComponent;
  let fixture: ComponentFixture<ProcessdatesSpandefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessdatesSpandefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessdatesSpandefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
