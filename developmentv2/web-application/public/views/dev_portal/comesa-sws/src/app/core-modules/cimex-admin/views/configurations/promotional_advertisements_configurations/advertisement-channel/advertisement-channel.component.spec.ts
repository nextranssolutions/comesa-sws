import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementChannelComponent } from './advertisement-channel.component';

describe('AdvertisementChannelComponent', () => {
  let component: AdvertisementChannelComponent;
  let fixture: ComponentFixture<AdvertisementChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementChannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
