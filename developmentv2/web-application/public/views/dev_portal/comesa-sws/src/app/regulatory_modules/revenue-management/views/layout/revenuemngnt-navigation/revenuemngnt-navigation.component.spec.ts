import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuemngntNavigationComponent } from './revenuemngnt-navigation.component';

describe('RevenuemngntNavigationComponent', () => {
  let component: RevenuemngntNavigationComponent;
  let fixture: ComponentFixture<RevenuemngntNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenuemngntNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuemngntNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
