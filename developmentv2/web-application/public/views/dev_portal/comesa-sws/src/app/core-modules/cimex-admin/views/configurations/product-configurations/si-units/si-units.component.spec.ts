import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiUnitsComponent } from './si-units.component';

describe('SiUnitsComponent', () => {
  let component: SiUnitsComponent;
  let fixture: ComponentFixture<SiUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiUnitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
