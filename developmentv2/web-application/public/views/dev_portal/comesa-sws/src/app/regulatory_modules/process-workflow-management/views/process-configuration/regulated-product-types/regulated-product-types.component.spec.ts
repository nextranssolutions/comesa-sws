import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatedProductTypesComponent } from './regulated-product-types.component';

describe('RegulatedProductTypesComponent', () => {
  let component: RegulatedProductTypesComponent;
  let fixture: ComponentFixture<RegulatedProductTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatedProductTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulatedProductTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
