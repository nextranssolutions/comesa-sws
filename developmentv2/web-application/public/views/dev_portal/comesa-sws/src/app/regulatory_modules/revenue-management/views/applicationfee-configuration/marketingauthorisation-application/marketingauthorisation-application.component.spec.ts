import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingauthorisationApplicationComponent } from './marketingauthorisation-application.component';

describe('MarketingauthorisationApplicationComponent', () => {
  let component: MarketingauthorisationApplicationComponent;
  let fixture: ComponentFixture<MarketingauthorisationApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingauthorisationApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketingauthorisationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
