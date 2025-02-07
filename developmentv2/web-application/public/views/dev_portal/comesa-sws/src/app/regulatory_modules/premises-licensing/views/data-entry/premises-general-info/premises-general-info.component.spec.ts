import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesGeneralInfoComponent } from './premises-general-info.component';

describe('PremisesGeneralInfoComponent', () => {
  let component: PremisesGeneralInfoComponent;
  let fixture: ComponentFixture<PremisesGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremisesGeneralInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisesGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
