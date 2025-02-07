import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseslicensingNavigationComponent } from './premiseslicensing-navigation.component';

describe('PremiseslicensingNavigationComponent', () => {
  let component: PremiseslicensingNavigationComponent;
  let fixture: ComponentFixture<PremiseslicensingNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseslicensingNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseslicensingNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
