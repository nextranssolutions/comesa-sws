import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodesproductsRegistryComponent } from './hscodesproducts-registry.component';

describe('HscodesproductsRegistryComponent', () => {
  let component: HscodesproductsRegistryComponent;
  let fixture: ComponentFixture<HscodesproductsRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodesproductsRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodesproductsRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
