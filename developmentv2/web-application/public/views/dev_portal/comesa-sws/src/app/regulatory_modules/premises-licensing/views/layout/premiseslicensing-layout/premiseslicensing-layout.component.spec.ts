import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseslicensingLayoutComponent } from './premiseslicensing-layout.component';

describe('PremiseslicensingLayoutComponent', () => {
  let component: PremiseslicensingLayoutComponent;
  let fixture: ComponentFixture<PremiseslicensingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseslicensingLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseslicensingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
