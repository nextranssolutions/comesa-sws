import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalapplicationfeeConfigurationComponent } from './disposalapplicationfee-configuration.component';

describe('DisposalapplicationfeeConfigurationComponent', () => {
  let component: DisposalapplicationfeeConfigurationComponent;
  let fixture: ComponentFixture<DisposalapplicationfeeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisposalapplicationfeeConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisposalapplicationfeeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
