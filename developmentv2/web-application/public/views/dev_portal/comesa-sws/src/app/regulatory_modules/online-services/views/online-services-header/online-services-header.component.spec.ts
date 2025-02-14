import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServicesHeaderComponent } from './online-services-header.component';

describe('OnlineServicesHeaderComponent', () => {
  let component: OnlineServicesHeaderComponent;
  let fixture: ComponentFixture<OnlineServicesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineServicesHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlineServicesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
