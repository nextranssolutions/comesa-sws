import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodestariffDetailsComponent } from './hscodestariff-details.component';

describe('HscodestariffDetailsComponent', () => {
  let component: HscodestariffDetailsComponent;
  let fixture: ComponentFixture<HscodestariffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodestariffDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodestariffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
