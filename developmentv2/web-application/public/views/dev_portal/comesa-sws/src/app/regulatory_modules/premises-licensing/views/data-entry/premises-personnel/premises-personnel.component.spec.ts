import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesPersonnelComponent } from './premises-personnel.component';

describe('PremisesPersonnelComponent', () => {
  let component: PremisesPersonnelComponent;
  let fixture: ComponentFixture<PremisesPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremisesPersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisesPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
