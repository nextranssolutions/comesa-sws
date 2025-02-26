import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryFunctionGuidelinesComponent } from './regulatory-function-guidelines.component';

describe('RegulatoryFunctionGuidelinesComponent', () => {
  let component: RegulatoryFunctionGuidelinesComponent;
  let fixture: ComponentFixture<RegulatoryFunctionGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatoryFunctionGuidelinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulatoryFunctionGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
