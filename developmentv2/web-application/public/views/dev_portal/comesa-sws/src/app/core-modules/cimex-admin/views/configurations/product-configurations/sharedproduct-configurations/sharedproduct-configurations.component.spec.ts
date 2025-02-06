import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedproductConfigurationsComponent } from './sharedproduct-configurations.component';

describe('SharedproductConfigurationsComponent', () => {
  let component: SharedproductConfigurationsComponent;
  let fixture: ComponentFixture<SharedproductConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedproductConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedproductConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
