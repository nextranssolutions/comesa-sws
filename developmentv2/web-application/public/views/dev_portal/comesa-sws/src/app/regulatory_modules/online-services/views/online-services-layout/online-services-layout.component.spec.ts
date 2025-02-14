import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServicesLayoutComponent } from './online-services-layout.component';

describe('OnlineServicesLayoutComponent', () => {
  let component: OnlineServicesLayoutComponent;
  let fixture: ComponentFixture<OnlineServicesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineServicesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineServicesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
