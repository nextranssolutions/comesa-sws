import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationfeeConfigurationComponent } from './applicationfee-configuration.component';

describe('ApplicationfeeConfigurationComponent', () => {
  let component: ApplicationfeeConfigurationComponent;
  let fixture: ComponentFixture<ApplicationfeeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationfeeConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationfeeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
