import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeRegistryproductsComponent } from './hscode-registryproducts.component';

describe('HscodeRegistryproductsComponent', () => {
  let component: HscodeRegistryproductsComponent;
  let fixture: ComponentFixture<HscodeRegistryproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeRegistryproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeRegistryproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
