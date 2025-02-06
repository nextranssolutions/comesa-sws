import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionadvertChannelsComponent } from './promotionadvert-channels.component';

describe('PromotionadvertChannelsComponent', () => {
  let component: PromotionadvertChannelsComponent;
  let fixture: ComponentFixture<PromotionadvertChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionadvertChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionadvertChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
