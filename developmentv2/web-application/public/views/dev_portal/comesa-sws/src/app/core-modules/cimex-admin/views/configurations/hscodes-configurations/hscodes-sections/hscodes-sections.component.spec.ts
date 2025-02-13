import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodesSectionsComponent } from './hscodes-sections.component';

describe('HscodesSectionsComponent', () => {
  let component: HscodesSectionsComponent;
  let fixture: ComponentFixture<HscodesSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodesSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodesSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
