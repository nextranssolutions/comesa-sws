import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPersonalproductsLicencedashboardComponent } from './draft-personalproducts-licencedashboard.component';

describe('DraftPersonalproductsLicencedashboardComponent', () => {
  let component: DraftPersonalproductsLicencedashboardComponent;
  let fixture: ComponentFixture<DraftPersonalproductsLicencedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftPersonalproductsLicencedashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftPersonalproductsLicencedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
