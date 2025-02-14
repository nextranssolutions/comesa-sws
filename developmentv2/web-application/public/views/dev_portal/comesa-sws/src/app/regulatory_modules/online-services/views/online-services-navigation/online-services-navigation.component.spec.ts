import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServicesNavigationComponent } from './online-services-navigation.component';

describe('OnlineServicesNavigationComponent', () => {
  let component: OnlineServicesNavigationComponent;
  let fixture: ComponentFixture<OnlineServicesNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineServicesNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineServicesNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
