import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRefnumberconfigurationsComponent } from './shared-refnumberconfigurations.component';

describe('SharedRefnumberconfigurationsComponent', () => {
  let component: SharedRefnumberconfigurationsComponent;
  let fixture: ComponentFixture<SharedRefnumberconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRefnumberconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedRefnumberconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
