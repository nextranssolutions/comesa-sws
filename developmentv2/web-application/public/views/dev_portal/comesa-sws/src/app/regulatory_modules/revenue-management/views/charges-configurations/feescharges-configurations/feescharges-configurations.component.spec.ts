import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeschargesConfigurationsComponent } from './feescharges-configurations.component';

describe('FeeschargesConfigurationsComponent', () => {
  let component: FeeschargesConfigurationsComponent;
  let fixture: ComponentFixture<FeeschargesConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeschargesConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeschargesConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
