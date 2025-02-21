import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatedProductsTypesComponent } from './regulated-products-types.component';

describe('RegulatedProductsTypesComponent', () => {
  let component: RegulatedProductsTypesComponent;
  let fixture: ComponentFixture<RegulatedProductsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatedProductsTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulatedProductsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
