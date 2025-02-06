import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionadvertisementFeesComponent } from './promotionadvertisement-fees.component';

describe('PromotionadvertisementFeesComponent', () => {
  let component: PromotionadvertisementFeesComponent;
  let fixture: ComponentFixture<PromotionadvertisementFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionadvertisementFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionadvertisementFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
