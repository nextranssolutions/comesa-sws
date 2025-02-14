import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducthscodeInformationComponent } from './producthscode-information.component';

describe('ProducthscodeInformationComponent', () => {
  let component: ProducthscodeInformationComponent;
  let fixture: ComponentFixture<ProducthscodeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducthscodeInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducthscodeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
