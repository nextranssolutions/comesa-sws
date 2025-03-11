import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHscodeAnalysisComponent } from './product-hscode-analysis.component';

describe('ProductHscodeAnalysisComponent', () => {
  let component: ProductHscodeAnalysisComponent;
  let fixture: ComponentFixture<ProductHscodeAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHscodeAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductHscodeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
