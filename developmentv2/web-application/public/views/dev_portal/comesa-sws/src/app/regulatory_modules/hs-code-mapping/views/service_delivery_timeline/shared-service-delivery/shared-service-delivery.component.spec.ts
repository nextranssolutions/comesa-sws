import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedServiceDeliveryComponent } from './shared-service-delivery.component';

describe('SharedServiceDeliveryComponent', () => {
  let component: SharedServiceDeliveryComponent;
  let fixture: ComponentFixture<SharedServiceDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedServiceDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedServiceDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
