import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTimeframeconfigurationsComponent } from './shared-timeframeconfigurations.component';

describe('SharedTimeframeconfigurationsComponent', () => {
  let component: SharedTimeframeconfigurationsComponent;
  let fixture: ComponentFixture<SharedTimeframeconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTimeframeconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedTimeframeconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
