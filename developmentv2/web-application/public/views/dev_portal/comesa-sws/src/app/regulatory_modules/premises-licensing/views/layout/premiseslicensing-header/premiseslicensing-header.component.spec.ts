import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseslicensingHeaderComponent } from './premiseslicensing-header.component';

describe('PremiseslicensingHeaderComponent', () => {
  let component: PremiseslicensingHeaderComponent;
  let fixture: ComponentFixture<PremiseslicensingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseslicensingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseslicensingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
