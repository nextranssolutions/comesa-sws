import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedChargesconfigComponent } from './shared-chargesconfig.component';

describe('SharedChargesconfigComponent', () => {
  let component: SharedChargesconfigComponent;
  let fixture: ComponentFixture<SharedChargesconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedChargesconfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedChargesconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
