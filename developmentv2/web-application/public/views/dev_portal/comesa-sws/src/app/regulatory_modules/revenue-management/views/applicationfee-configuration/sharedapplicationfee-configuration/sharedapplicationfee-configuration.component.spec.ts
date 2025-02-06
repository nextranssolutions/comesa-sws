import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedapplicationfeeConfigurationComponent } from './sharedapplicationfee-configuration.component';

describe('SharedapplicationfeeConfigurationComponent', () => {
  let component: SharedapplicationfeeConfigurationComponent;
  let fixture: ComponentFixture<SharedapplicationfeeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedapplicationfeeConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedapplicationfeeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
