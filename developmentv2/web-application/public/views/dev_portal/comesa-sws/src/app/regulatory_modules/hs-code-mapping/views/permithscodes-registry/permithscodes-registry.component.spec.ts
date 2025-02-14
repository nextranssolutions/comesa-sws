import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermithscodesRegistryComponent } from './permithscodes-registry.component';

describe('PermithscodesRegistryComponent', () => {
  let component: PermithscodesRegistryComponent;
  let fixture: ComponentFixture<PermithscodesRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermithscodesRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermithscodesRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
