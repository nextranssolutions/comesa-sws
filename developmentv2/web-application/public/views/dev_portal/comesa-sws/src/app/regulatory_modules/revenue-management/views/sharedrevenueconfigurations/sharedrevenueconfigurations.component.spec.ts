import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedrevenueconfigurationsComponent } from './sharedrevenueconfigurations.component';

describe('SharedrevenueconfigurationsComponent', () => {
  let component: SharedrevenueconfigurationsComponent;
  let fixture: ComponentFixture<SharedrevenueconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedrevenueconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedrevenueconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
