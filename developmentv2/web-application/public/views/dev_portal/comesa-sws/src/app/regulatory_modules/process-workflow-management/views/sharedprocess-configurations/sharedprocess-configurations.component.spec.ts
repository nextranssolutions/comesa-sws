import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedprocessConfigurationsComponent } from './sharedprocess-configurations.component';

describe('SharedprocessConfigurationsComponent', () => {
  let component: SharedprocessConfigurationsComponent;
  let fixture: ComponentFixture<SharedprocessConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedprocessConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedprocessConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
