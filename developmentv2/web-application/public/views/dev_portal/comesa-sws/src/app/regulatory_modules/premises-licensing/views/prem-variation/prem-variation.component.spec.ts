import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremVariationComponent } from './prem-variation.component';

describe('PremVariationComponent', () => {
  let component: PremVariationComponent;
  let fixture: ComponentFixture<PremVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremVariationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
